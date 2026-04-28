const express = require("express");
const {
  createPublicIntake,
  listPublicIntakes,
  updatePublicIntakeStatus,
  approvePublicIntake
} = require("./controller");
const { validate } = require("../../middlewares/validate.middleware");
const {
  createPublicIntakeSchema,
  listPublicIntakesQuerySchema,
  updatePublicIntakeSchema,
  approvePublicIntakeSchema
} = require("./validation");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.post("/requests", validate(createPublicIntakeSchema), createPublicIntake);
router.get(
  "/requests",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]),
  validate(listPublicIntakesQuerySchema, "query"),
  listPublicIntakes
);
router.patch(
  "/requests/:id",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]),
  validate(updatePublicIntakeSchema),
  updatePublicIntakeStatus
);
router.post(
  "/requests/:id/approve",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN]),
  validate(approvePublicIntakeSchema),
  approvePublicIntake
);

module.exports = router;
