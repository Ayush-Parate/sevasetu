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
const adminRoutes = require("../modules/admin/routes");
const ngoRoutes = require("../modules/ngo/routes");
const fcRoutes = require("../modules/fc/routes");
const volunteerModuleRoutes = require("../modules/volunteer/routes");
const verifierRoutes = require("../modules/verifier/routes");
const donorRoutes = require("../modules/donor/routes");

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
router.use("/admin", adminRoutes);
router.use("/ngo", ngoRoutes);
router.use("/fc", fcRoutes);
router.use("/volunteer", volunteerModuleRoutes);
router.use("/verifier", verifierRoutes);
router.use("/donor", donorRoutes);

module.exports = router;
