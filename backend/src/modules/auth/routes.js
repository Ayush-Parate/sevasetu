const express = require("express");
const {
  register,
  registerAdmin,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
  verifyEmail
} = require("./controller");
const { validate } = require("../../middlewares/validate.middleware");
const {
  loginSchema,
  registerSchema,
  adminRegisterSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema
} = require("./validation");
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
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", authenticate, attachUser(), logout);
router.get("/me", authenticate, attachUser(), me);

module.exports = router;
