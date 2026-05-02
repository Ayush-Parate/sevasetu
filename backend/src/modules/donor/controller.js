const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getDonorStats = asyncHandler(async (req, res) => {
  const data = await service.getDonorStats(req.user._id);
  res.json({ success: true, data });
});

const getMarketplace = asyncHandler(async (req, res) => {
  const data = await service.getMarketplace();
  res.json({ success: true, data });
});

const getLedger = asyncHandler(async (req, res) => {
  const data = await service.getLedger();
  res.json({ success: true, data });
});

module.exports = { getDonorStats, getMarketplace, getLedger };
