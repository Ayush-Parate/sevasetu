const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../userRole/models");
const { ROLES } = require("../../constants/roles");

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
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) {
    throw { statusCode: 409, message: "Email already exists" };
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  // Prevent role escalation: public signup always creates a Volunteer.
  const user = await User.create({ ...payload, role: ROLES.VOLUNTEER, passwordHash });
  return { id: user.id, fullName: user.fullName, email: user.email, role: user.role };
}

async function registerAdmin(payload) {
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) throw { statusCode: 409, message: "Email already exists" };

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, passwordHash });
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
  const user = await User.findOne({ email: email.toLowerCase() });
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

  const { accessToken, refreshToken } = await issueTokensForUser(user);
  return {
    accessToken,
    refreshToken,
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
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

module.exports = { registerPublic, registerAdmin, login, refreshTokens, logout, signAccessToken };
