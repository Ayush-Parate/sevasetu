const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getUsers = asyncHandler(async (_req, res) => {
  const users = await service.listUsers();
  res.json({ success: true, data: users });
});

module.exports = { getUsers };
