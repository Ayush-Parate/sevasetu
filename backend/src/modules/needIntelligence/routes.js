const express = require("express");
const { createNeed, listNeeds } = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.get(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  listNeeds
);
router.post(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  createNeed
);

module.exports = router;
