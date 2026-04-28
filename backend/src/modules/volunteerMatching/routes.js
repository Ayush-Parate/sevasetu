const express = require("express");
const { createMatch, listMatches, matchVolunteers } = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.get(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  listMatches
);
router.post(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  createMatch
);
router.get(
  "/match-volunteers/:taskId",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  matchVolunteers
);

module.exports = router;
