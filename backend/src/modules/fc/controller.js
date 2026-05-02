const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getFCStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const locationLng = req.user.locationLng;
  const data = await service.getFCStats(userId, locationLng);
  res.json({ success: true, data });
});

const listVolunteers = asyncHandler(async (req, res) => {
  const data = await service.listVolunteers(req.user.locationLng);
  res.json({ success: true, data });
});

module.exports = { getFCStats, listVolunteers };
