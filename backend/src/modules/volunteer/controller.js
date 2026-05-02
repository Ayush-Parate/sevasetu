const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getVolunteerStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const data = await service.getVolunteerStats(userId);
  res.json({ success: true, data });
});

module.exports = { getVolunteerStats };
