const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getVerifierStats = asyncHandler(async (req, res) => {
  const data = await service.getVerifierStats();
  res.json({ success: true, data });
});

module.exports = { getVerifierStats };
