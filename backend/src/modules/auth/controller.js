const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

function setRefreshCookie(res, refreshToken) {
  const isProd = (process.env.NODE_ENV || "development") === "production";
  const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: isProd
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
}

function clearRefreshCookie(res) {
  const isProd = (process.env.NODE_ENV || "development") === "production";
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict", secure: isProd });
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
    data: { id: req.user.id, fullName: req.user.fullName, email: req.user.email, role: req.user.role }
  });
});

module.exports = { register, registerAdmin, login, refresh, logout, me };
