const express = require("express");
const { addPoint, getHeatmapData, getHotspots, getAreaSummary } = require("./controller");
const { authenticate, attachUser, authorize } = require("../../middlewares/auth.middleware");
const { ROLES } = require("../../constants/roles");

const router = express.Router();

router.get(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  getHeatmapData
);
router.get(
  "/heatmap",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER, ROLES.VOLUNTEER]),
  getHeatmapData
);
router.get(
  "/hotspots",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER]),
  getHotspots
);
router.get(
  "/area-summary/:location",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR, ROLES.VERIFIER]),
  getAreaSummary
);
router.post(
  "/",
  authenticate,
  attachUser(),
  authorize([ROLES.SUPER_ADMIN, ROLES.NGO_ADMIN, ROLES.FIELD_COORDINATOR]),
  addPoint
);

module.exports = router;
