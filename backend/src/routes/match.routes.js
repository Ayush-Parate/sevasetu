const express = require("express");
const { authenticate, attachUser, authorize } = require("../middlewares/auth.middleware");
const { matchVolunteers } = require("../modules/volunteerMatching/controller");
const { ROLES } = require("../constants/roles");

const router = express.Router();

router.get(
  "/:taskId",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  matchVolunteers
);

module.exports = router;
