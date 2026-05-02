const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

function setRefreshCookie(res, refreshToken) {
  const isProd = (process.env.NODE_ENV || "development") === "production";
  const sameSiteEnv = (process.env.COOKIE_SAMESITE || "").toLowerCase();
  const sameSite =
    sameSiteEnv === "none" || sameSiteEnv === "lax" || sameSiteEnv === "strict"
      ? sameSiteEnv
      : isProd
        ? "none"
        : "strict";
  const cookieOptions = {
    httpOnly: true,
    sameSite,
    secure: isProd || sameSite === "none"
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
}

function clearRefreshCookie(res) {
  const isProd = (process.env.NODE_ENV || "development") === "production";
  const sameSiteEnv = (process.env.COOKIE_SAMESITE || "").toLowerCase();
  const sameSite =
    sameSiteEnv === "none" || sameSiteEnv === "lax" || sameSiteEnv === "strict"
      ? sameSiteEnv
      : isProd
        ? "none"
        : "strict";
  res.clearCookie("refreshToken", { httpOnly: true, sameSite, secure: isProd || sameSite === "none" });
}

const register = asyncHandler(async (req, res) => {
  const user = await service.registerPublic(req.body);
  res.status(201).json({ success: true, data: user });
});

const registerAdmin = asyncHandler(async (req, res) => {
  const user = await service.registerAdmin(req.body);
  res.status(201).json({ success: true, data: user });
});

const login = asyncHandler(async (req, res) => {
  const result = await service.login(req.body);
  setRefreshCookie(res, result.refreshToken);
  res.status(200).json({
    success: true,
    data: { accessToken: result.accessToken, user: result.user }
  });
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const result = await service.refreshTokens(token);
  setRefreshCookie(res, result.refreshToken);
  res.status(200).json({ success: true, data: { accessToken: result.accessToken } });
});

const logout = asyncHandler(async (req, res) => {
  await service.logout(req.user.id);
  clearRefreshCookie(res);
  res.status(200).json({ success: true, message: "Logged out" });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      emailVerified: req.user.emailVerified !== false
    }
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await service.requestPasswordReset(req.body);
  const message = result.mailSent
    ? "If an account exists for that email, password reset instructions were sent."
    : "If an account exists for that email, a reset token was issued. Configure SMTP (SMTP_HOST / SMTP_USER / SMTP_PASS or SMTP_URL) to email it automatically; otherwise check API logs in development.";
  res.status(200).json({
    success: true,
    message,
    data: { devResetToken: result.devToken || undefined }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  await service.resetPasswordWithToken(req.body);
  res.status(200).json({ success: true, message: "Password updated", data: { ok: true } });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await service.verifyEmailWithToken(req.body);
  res.status(200).json({ success: true, message: "Email verified", data: user });
});

module.exports = {
  register,
  registerAdmin,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
  verifyEmail
};
