const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getStats = asyncHandler(async (_req, res) => {
  const stats = await service.getAdminStats();
  res.json({ success: true, data: stats });
});

const getSuspiciousReports = asyncHandler(async (_req, res) => {
  const reports = await service.getSuspiciousNeeds();
  res.json({ success: true, data: reports });
});

const getFlaggedVolunteers = asyncHandler(async (_req, res) => {
  const volunteers = await service.getFlaggedVolunteers();
  res.json({ success: true, data: volunteers });
});

const penalizeTrustScore = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;
  if (typeof delta !== "number") {
    return res.status(400).json({ success: false, message: "delta must be a number" });
  }
  const result = await service.updateVolunteerTrustScore(id, delta);
  res.json({ success: true, data: result });
});

const getPlatformAnalyticsCtrl = asyncHandler(async (_req, res) => {
  const data = await service.getPlatformAnalytics();
  res.json({ success: true, data });
});

const getEmergencyStatsCtrl = asyncHandler(async (_req, res) => {
  const data = await service.getEmergencyStats();
  res.json({ success: true, data });
});

const getRoleDistributionCtrl = asyncHandler(async (_req, res) => {
  const data = await service.getRoleDistribution();
  res.json({ success: true, data });
});

module.exports = {
  getStats,
  getSuspiciousReports,
  getFlaggedVolunteers,
  penalizeTrustScore,
  getPlatformAnalyticsCtrl,
  getEmergencyStatsCtrl,
  getRoleDistributionCtrl
};
