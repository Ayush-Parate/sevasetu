const jwt = require("jsonwebtoken");
const { User } = require("../modules/userRole/models");
const { ROLE_PERMISSIONS } = require("../constants/permissions");

function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({ statusCode: 401, message: "Missing or invalid authorization token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "change_me");
    req.auth = decoded;
    return next();
  } catch (_error) {
    return next({ statusCode: 401, message: "Invalid or expired token" });
  }
}

function attachUser() {
  return async (req, _res, next) => {
    try {
      if (!req.auth?.id) return next({ statusCode: 401, message: "Unauthorized" });

      const user = await User.findById(req.auth.id);
      if (!user) return next({ statusCode: 401, message: "User not found" });
      if (!user.isActive) return next({ statusCode: 403, message: "User is inactive" });

      req.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  };
}

function authorize(allowedRoles = []) {
  return async (req, _res, next) => {
    try {
      const role = req.user?.role || req.auth?.role;
      if (!role) return next({ statusCode: 401, message: "Unauthorized" });

      if (!allowedRoles.includes(role)) {
        return next({ statusCode: 403, message: "Forbidden" });
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

function requirePermissions(required = []) {
  return (req, _res, next) => {
    const role = req.user?.role || req.auth?.role;
    if (!role) return next({ statusCode: 401, message: "Unauthorized" });

    const allowed = new Set(ROLE_PERMISSIONS[role] || []);
    const missing = required.filter((p) => !allowed.has(p));
    if (missing.length) return next({ statusCode: 403, message: "Forbidden" });

    return next();
  };
}

module.exports = { authenticate, attachUser, authorize, requirePermissions };
