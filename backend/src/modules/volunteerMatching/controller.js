const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const createMatch = asyncHandler(async (req, res) => {
  const match = await service.createMatch(req.body);
  res.status(201).json({ success: true, data: match });
});

const listMatches = asyncHandler(async (_req, res) => {
  const matches = await service.listMatches();
  res.json({ success: true, data: matches });
});

const matchVolunteers = asyncHandler(async (req, res) => {
  const topVolunteers = await service.matchVolunteersForTask(req.params.taskId);
  res.status(200).json({
    success: true,
    taskId: req.params.taskId,
    totalRanked: topVolunteers.length,
    data: topVolunteers
  });
});

module.exports = { createMatch, listMatches, matchVolunteers };
