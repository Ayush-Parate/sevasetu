const express = require("express");
const authRoutes = require("../modules/auth/routes");
const userRoleRoutes = require("../modules/userRole/routes");
const needRoutes = require("../modules/needIntelligence/routes");
const volunteerRoutes = require("../modules/volunteerMatching/routes");
const taskRoutes = require("../modules/taskManagement/routes");
const geoRoutes = require("../modules/geoHeatmap/routes");
const impactRoutes = require("../modules/impactAnalytics/routes");
const fileRoutes = require("../modules/fileProcessing/routes");
const publicIntakeRoutes = require("../modules/publicIntake/routes");
const matchRoutes = require("./match.routes");
const impactPublicRoutes = require("./impact.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoleRoutes);
router.use("/needs", needRoutes);
router.use("/volunteer-matching", volunteerRoutes);
router.use("/tasks", taskRoutes);
router.use("/geo-heatmap", geoRoutes);
router.use("/impact-analytics", impactRoutes);
router.use("/impact", impactPublicRoutes);
router.use("/files", fileRoutes);
router.use("/public", publicIntakeRoutes);
router.use("/match-volunteers", matchRoutes);

module.exports = router;
