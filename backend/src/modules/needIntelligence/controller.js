const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const createNeed = asyncHandler(async (req, res) => {
  const need = await service.createNeed(req.body);
  res.status(201).json({ success: true, data: need });
});

const listNeeds = asyncHandler(async (_req, res) => {
  const needs = await service.listNeeds();
  res.json({ success: true, data: needs });
});

const updateNeedStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await service.updateNeedStatus(id, status);
  res.json({ success: true, data: result });
});

module.exports = { createNeed, listNeeds, updateNeedStatus };
