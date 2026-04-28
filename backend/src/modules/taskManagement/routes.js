const express = require("express");
const { createTask, listTasks, assignTask, updateTaskStatus } = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");
const { validate } = require("../../middlewares/validate.middleware");
const { createTaskSchema, assignTaskSchema, updateTaskStatusSchema } = require("./validation");

const router = express.Router();

router.get(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  listTasks
);
router.post(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  validate(createTaskSchema),
  createTask
);
router.patch(
  "/:id/assign",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  validate(assignTaskSchema),
  assignTask
);
router.patch(
  "/:id/status",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VOLUNTEER, ROLES.VERIFIER]),
  validate(updateTaskStatusSchema),
  updateTaskStatus
);

module.exports = router;
