const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const createPublicIntake = asyncHandler(async (req, res) => {
  const record = await service.createPublicIntake(req.body);
  res.status(201).json({
    success: true,
    data: record,
    message: "Request captured successfully"
  });
});

const listPublicIntakes = asyncHandler(async (req, res) => {
  const records = await service.listPublicIntakes(req.query);
  res.status(200).json({ success: true, data: records });
});

const updatePublicIntakeStatus = asyncHandler(async (req, res) => {
  const record = await service.updatePublicIntakeStatus(req.params.id, req.body, req.user.id);
  res.status(200).json({ success: true, data: record });
});

const approvePublicIntake = asyncHandler(async (req, res) => {
  const result = await service.approvePublicIntake(req.params.id, req.body, req.user);
  res.status(200).json({ success: true, data: result, message: "Request approved and user created" });
});

module.exports = { createPublicIntake, listPublicIntakes, updatePublicIntakeStatus, approvePublicIntake };
