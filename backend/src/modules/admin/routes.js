const express = require("express");
const {
  getStats,
  getSuspiciousReports,
  getFlaggedVolunteers,
  penalizeTrustScore,
  getPlatformAnalyticsCtrl,
  getEmergencyStatsCtrl,
  getRoleDistributionCtrl
} = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.use(authenticate, attachUser(), authorize([ROLES.SUPER_ADMIN]));

router.get("/stats", getStats);
router.get("/fraud/suspicious-reports", getSuspiciousReports);
router.get("/fraud/flagged-volunteers", getFlaggedVolunteers);
router.patch("/fraud/volunteers/:id/trust", penalizeTrustScore);
router.get("/analytics", getPlatformAnalyticsCtrl);
router.get("/emergency-stats", getEmergencyStatsCtrl);
router.get("/role-distribution", getRoleDistributionCtrl);

module.exports = router;
