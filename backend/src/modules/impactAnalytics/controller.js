const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const createMetric = asyncHandler(async (req, res) => {
  const metric = await service.createMetric(req.body);
  res.status(201).json({ success: true, data: metric });
});

const listMetrics = asyncHandler(async (_req, res) => {
  const metrics = await service.listMetrics();
  res.json({ success: true, data: metrics });
});

const getImpactSummary = asyncHandler(async (req, res) => {
  const data = await service.getImpactSummary(req.query);
  res.json({ success: true, data });
});

const getImpactTask = asyncHandler(async (req, res) => {
  const data = await service.getImpactByTask(req.params.id);
  res.json({ success: true, data });
});

const getImpactArea = asyncHandler(async (req, res) => {
  const data = await service.getImpactByArea(req.params.location, req.query);
  res.json({ success: true, data });
});

module.exports = { createMetric, listMetrics, getImpactSummary, getImpactTask, getImpactArea };
