const express = require("express");
const { createTask, listTasks } = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

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
  createTask
);

module.exports = router;
