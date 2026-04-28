const express = require("express");
const { authenticate, attachUser, authorize } = require("../middlewares/auth.middleware");
const { getImpactSummary, getImpactTask, getImpactArea } = require("../modules/impactAnalytics/controller");
const { ROLES } = require("../constants/roles");

const router = express.Router();

router.get(
  "/summary",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  getImpactSummary
);
router.get(
  "/task/:id",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  getImpactTask
);
router.get(
  "/area/:location",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER]),
  getImpactArea
);

module.exports = router;
