const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getNGOStats = asyncHandler(async (_req, res) => {
  const data = await service.getNGOStats();
  res.json({ success: true, data });
});

const listVolunteers = asyncHandler(async (req, res) => {
  const { status, limit } = req.query;
  const data = await service.listVolunteers({ status, limit: Number(limit) || 50 });
  res.json({ success: true, data });
});

const listFieldCoordinators = asyncHandler(async (_req, res) => {
  const data = await service.listFieldCoordinators();
  res.json({ success: true, data });
});

module.exports = { getNGOStats, listVolunteers, listFieldCoordinators };
