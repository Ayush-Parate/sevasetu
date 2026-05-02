const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../userRole/models");
const { ROLES } = require("../../constants/roles");
const logger = require("../../config/logger");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../../utils/email");

const DEFAULT_SUPER_ADMIN_EMAIL = "superadmin@janconnect.local";
const DEFAULT_SUPER_ADMIN_PASSWORD = "SuperAdmin@123";

/** Volunteer & Donor only — NGO Admin / FC / Verifier via `/register-admin` or public intake approval. */
const SELF_SIGNUP_ROLES = new Set([ROLES.VOLUNTEER, ROLES.DONOR]);

function emailVerificationRequired() {
  return process.env.REQUIRE_EMAIL_VERIFICATION === "true";
}

function signAccessToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "change_me",
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
  );
}

function signRefreshToken({ userId, tokenId }) {
  return jwt.sign(
    { id: userId, tid: tokenId, typ: "refresh" },
    process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET || "change_me"),
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
  );
}

function parseJwtExpiryToDate(expiresIn) {
  // Supports jsonwebtoken formats: "7d", "15m", seconds (number-like string)
  if (!expiresIn) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const str = String(expiresIn).trim();
  const asNumber = Number(str);
  if (!Number.isNaN(asNumber) && Number.isFinite(asNumber)) return new Date(Date.now() + asNumber * 1000);

  const m = str.match(/^(\d+)\s*([smhd])$/i);
  if (!m) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const value = Number(m[1]);
  const unit = m[2].toLowerCase();
  const mult = unit === "s" ? 1000 : unit === "m" ? 60_000 : unit === "h" ? 3_600_000 : 86_400_000;
  return new Date(Date.now() + value * mult);
}

async function registerPublic(payload) {
  const normalizedEmail = payload.email.toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw { statusCode: 409, message: "Email already exists" };
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const requestedRole =
    payload.role && SELF_SIGNUP_ROLES.has(payload.role) ? payload.role : ROLES.VOLUNTEER;

  const needVerify = emailVerificationRequired();
  let emailVerificationTokenHash = null;
  let emailVerificationExpiresAt = null;
  let verificationPlain = null;
  if (needVerify) {
    verificationPlain = crypto.randomBytes(24).toString("hex");
    emailVerificationTokenHash = await bcrypt.hash(verificationPlain, 10);
    emailVerificationExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
  }

  const user = await User.create({
    fullName: payload.fullName.trim(),
    email: normalizedEmail,
    phone: payload.phone || null,
    role: requestedRole,
    passwordHash,
    emailVerified: !needVerify,
    emailVerificationTokenHash,
    emailVerificationExpiresAt
  });

  const base = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    requiresVerification: needVerify,
    emailVerified: user.emailVerified !== false
  };

  if (needVerify && verificationPlain) {
    let mailSent = false;
    try {
      mailSent = await sendVerificationEmail(user.email, verificationPlain);
    } catch (err) {
      logger.error("sendVerificationEmail threw", { message: err?.message });
    }
    if (
      !mailSent &&
      (process.env.NODE_ENV || "development") !== "production"
    ) {
      logger.info("Email verification token (development fallback — configure SMTP to mail users)", {
        email: user.email,
        token: verificationPlain
      });
    }
  }

  return base;
}

async function registerAdmin(payload) {
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) throw { statusCode: 409, message: "Email already exists" };

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    ...payload,
    email: payload.email.toLowerCase(),
    passwordHash,
    emailVerified: true,
    emailVerificationTokenHash: null,
    emailVerificationExpiresAt: null
  });
  return { id: user.id, fullName: user.fullName, email: user.email, role: user.role };
}

async function issueTokensForUser(user) {
  const accessToken = signAccessToken(user);

  const tokenId = crypto.randomBytes(32).toString("hex");
  const refreshToken = signRefreshToken({ userId: user.id, tokenId });

  const refreshTokenHash = await bcrypt.hash(tokenId, 10);
  const refreshTokenExpiresAt = parseJwtExpiryToDate(process.env.JWT_REFRESH_EXPIRES_IN || "7d");

  user.refreshTokenHash = refreshTokenHash;
  user.refreshTokenExpiresAt = refreshTokenExpiresAt;
  await user.save();

  return { accessToken, refreshToken };
}

async function login({ email, password }) {
  const normalizedEmail = email.toLowerCase();
  const isProd = (process.env.NODE_ENV || "development") === "production";
  const fixedSuperAdminEmail = (process.env.SUPER_ADMIN_EMAIL || (isProd ? null : DEFAULT_SUPER_ADMIN_EMAIL))?.toLowerCase();
  const fixedSuperAdminPassword = process.env.SUPER_ADMIN_PASSWORD || (isProd ? null : DEFAULT_SUPER_ADMIN_PASSWORD);
  const isFixedSuperAdminLogin =
    Boolean(fixedSuperAdminEmail && fixedSuperAdminPassword) &&
    normalizedEmail === fixedSuperAdminEmail &&
    password === fixedSuperAdminPassword;

  if (isFixedSuperAdminLogin) {
    let superAdminUser = await User.findOne({ email: fixedSuperAdminEmail });
    if (!superAdminUser) {
      const passwordHash = await bcrypt.hash(fixedSuperAdminPassword, 10);
      superAdminUser = await User.create({
        fullName: "Super Admin",
        email: fixedSuperAdminEmail,
        passwordHash,
        role: ROLES.SUPER_ADMIN,
        isActive: true
      });
    } else if (!superAdminUser.isActive || superAdminUser.role !== ROLES.SUPER_ADMIN) {
      superAdminUser.isActive = true;
      superAdminUser.role = ROLES.SUPER_ADMIN;
      await superAdminUser.save();
    }

    const { accessToken, refreshToken } = await issueTokensForUser(superAdminUser);
    return {
      accessToken,
      refreshToken,
      user: {
        id: superAdminUser.id,
        fullName: superAdminUser.fullName,
        email: superAdminUser.email,
        role: superAdminUser.role,
        emailVerified: superAdminUser.emailVerified !== false
      }
    };
  }

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }
  if (!user.isActive) {
    throw { statusCode: 403, message: "User is inactive" };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }

  if (user.emailVerified === false) {
    throw { statusCode: 403, message: "Verify your email before signing in." };
  }

  const { accessToken, refreshToken } = await issueTokensForUser(user);
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified !== false
    }
  };
}

async function refreshTokens(refreshTokenJwt) {
  if (!refreshTokenJwt) throw { statusCode: 401, message: "Missing refresh token" };

  let decoded;
  try {
    decoded = jwt.verify(
      refreshTokenJwt,
      process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET || "change_me")
    );
  } catch (_e) {
    throw { statusCode: 401, message: "Invalid or expired refresh token" };
  }

  if (!decoded?.id || decoded?.typ !== "refresh" || !decoded?.tid) {
    throw { statusCode: 401, message: "Invalid refresh token" };
  }

  const user = await User.findById(decoded.id);
  if (!user) throw { statusCode: 401, message: "User not found" };
  if (!user.isActive) throw { statusCode: 403, message: "User is inactive" };
  if (!user.refreshTokenHash || !user.refreshTokenExpiresAt) {
    throw { statusCode: 401, message: "Refresh token revoked" };
  }
  if (user.refreshTokenExpiresAt.getTime() < Date.now()) {
    user.refreshTokenHash = null;
    user.refreshTokenExpiresAt = null;
    await user.save();
    throw { statusCode: 401, message: "Refresh token expired" };
  }

  const matches = await bcrypt.compare(decoded.tid, user.refreshTokenHash);
  if (!matches) {
    // Token reuse or rotation mismatch => revoke.
    user.refreshTokenHash = null;
    user.refreshTokenExpiresAt = null;
    await user.save();
    throw { statusCode: 401, message: "Refresh token revoked" };
  }

  const { accessToken, refreshToken } = await issueTokensForUser(user);
  return { accessToken, refreshToken };
}

async function logout(userId) {
  const user = await User.findById(userId);
  if (!user) return;
  user.refreshTokenHash = null;
  user.refreshTokenExpiresAt = null;
  await user.save();
}

async function requestPasswordReset({ email }) {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  let devToken = null;
  let mailSent = false;
  if (user && user.isActive) {
    const plain = crypto.randomBytes(24).toString("hex");
    user.passwordResetTokenHash = await bcrypt.hash(plain, 10);
    user.passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();
    try {
      mailSent = await sendPasswordResetEmail(normalizedEmail, plain);
    } catch (err) {
      logger.error("sendPasswordResetEmail threw", { message: err?.message });
    }
    if (!mailSent && (process.env.NODE_ENV || "development") !== "production") {
      logger.info("Password reset token (development fallback — configure SMTP for email delivery)", {
        email: normalizedEmail,
        token: plain
      });
      devToken = plain;
    }
  }
  return { acknowledged: true, devToken, mailSent };
}

async function resetPasswordWithToken({ email, token, password }) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user?.passwordResetTokenHash || !user.passwordResetExpiresAt) {
    throw { statusCode: 400, message: "Invalid or expired reset link" };
  }
  if (user.passwordResetExpiresAt.getTime() < Date.now()) {
    throw { statusCode: 400, message: "Reset link expired" };
  }
  const tokenOk = await bcrypt.compare(token, user.passwordResetTokenHash);
  if (!tokenOk) {
    throw { statusCode: 400, message: "Invalid or expired reset link" };
  }

  user.passwordHash = await bcrypt.hash(password, 10);
  user.passwordResetTokenHash = null;
  user.passwordResetExpiresAt = null;
  user.refreshTokenHash = null;
  user.refreshTokenExpiresAt = null;
  await user.save();
}

async function verifyEmailWithToken({ email, token }) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw { statusCode: 400, message: "Invalid verification request" };
  }
  if (user.emailVerified !== false) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      alreadyVerified: true
    };
  }
  if (!user.emailVerificationTokenHash || !user.emailVerificationExpiresAt) {
    throw { statusCode: 400, message: "Invalid verification request" };
  }
  if (user.emailVerificationExpiresAt.getTime() < Date.now()) {
    throw { statusCode: 400, message: "Verification link expired" };
  }
  const ok = await bcrypt.compare(token, user.emailVerificationTokenHash);
  if (!ok) {
    throw { statusCode: 400, message: "Invalid verification token" };
  }

  user.emailVerified = true;
  user.emailVerificationTokenHash = null;
  user.emailVerificationExpiresAt = null;
  await user.save();

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    alreadyVerified: false
  };
}

module.exports = {
  registerPublic,
  registerAdmin,
  login,
  refreshTokens,
  logout,
  signAccessToken,
  requestPasswordReset,
  resetPasswordWithToken,
  verifyEmailWithToken
};
