const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const addPoint = asyncHandler(async (req, res) => {
  const point = await service.addPoint(req.body);
  res.status(201).json({ success: true, data: point });
});

const getHeatmapData = asyncHandler(async (_req, res) => {
  const points = await service.getHeatmapData(_req.query);
  res.json({ success: true, data: points });
});

const getHotspots = asyncHandler(async (req, res) => {
  const hotspots = await service.getHotspots(req.query);
  res.json({ success: true, data: hotspots });
});

const getAreaSummary = asyncHandler(async (req, res) => {
  const summary = await service.getAreaSummary(req.params.location);
  res.json({ success: true, data: summary });
});

module.exports = { addPoint, getHeatmapData, getHotspots, getAreaSummary };
