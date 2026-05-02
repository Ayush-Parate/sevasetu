const service = require("./service");
const { asyncHandler } = require("../../utils/asyncHandler");

const getUsers = asyncHandler(async (_req, res) => {
  const users = await service.listUsers();
  res.json({ success: true, data: users });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  if (typeof isActive !== "boolean") {
    return res.status(400).json({ success: false, message: "isActive must be a boolean" });
  }
  const result = await service.updateUserStatus(id, isActive);
  res.json({ success: true, data: result });
});

module.exports = { getUsers, updateStatus };
