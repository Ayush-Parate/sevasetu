const express = require("express");
const { register, registerAdmin, login, refresh, logout, me } = require("./controller");
const { validate } = require("../../middlewares/validate.middleware");
const { loginSchema, registerSchema, adminRegisterSchema, refreshSchema } = require("./validation");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post(
  "/register-admin",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]),
  validate(adminRegisterSchema),
  registerAdmin
);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", authenticate, attachUser(), logout);
router.get("/me", authenticate, attachUser(), me);

module.exports = router;
