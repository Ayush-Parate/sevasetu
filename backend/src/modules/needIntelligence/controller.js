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

module.exports = { createNeed, listNeeds };
