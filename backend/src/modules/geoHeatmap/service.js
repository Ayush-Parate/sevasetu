const { Op } = require("sequelize");
const { GeoPoint } = require("./models");
const { Need } = require("../needIntelligence/models");

const MAX_QUERY_ROWS = 20000;

function toNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getUrgencyColor(urgency) {
  if (urgency >= 80) return "red";
  if (urgency >= 60) return "orange";
  if (urgency >= 35) return "yellow";
  return "green";
}

function getClusterPrecision(zoom = 8) {
  if (zoom >= 14) return 4;
  if (zoom >= 11) return 3;
  return 2;
}

function buildNeedFilter({ minLat, maxLat, minLng, maxLng, region }) {
  const where = {
    locationLat: { [Op.ne]: null },
    locationLng: { [Op.ne]: null }
  };

  if (minLat !== null || maxLat !== null) {
    where.locationLat = {};
    if (minLat !== null) where.locationLat[Op.gte] = minLat;
    if (maxLat !== null) where.locationLat[Op.lte] = maxLat;
  }

  if (minLng !== null || maxLng !== null) {
    where.locationLng = {};
    if (minLng !== null) where.locationLng[Op.gte] = minLng;
    if (maxLng !== null) where.locationLng[Op.lte] = maxLng;
  }

  if (region) {
    where.location = { [Op.iLike]: `%${region}%` };
  }

  return where;
}

function clusterNeeds(needs, precision) {
  const clusters = new Map();
  needs.forEach((need) => {
    const lat = Number(need.locationLat);
    const lng = Number(need.locationLng);
    const key = `${lat.toFixed(precision)}:${lng.toFixed(precision)}`;

    if (!clusters.has(key)) {
      clusters.set(key, {
        latSum: 0,
        lngSum: 0,
        urgencySum: 0,
        count: 0,
        needs: []
      });
    }

    const cluster = clusters.get(key);
    cluster.latSum += lat;
    cluster.lngSum += lng;
    cluster.urgencySum += Number(need.urgencyScore || 0);
    cluster.count += 1;
    cluster.needs.push({
      id: need.id,
      title: need.title,
      category: need.aiLabel,
      urgencyScore: Number(need.urgencyScore || 0),
      location: need.location
    });
  });

  return [...clusters.values()].map((cluster) => {
    const averageUrgency = cluster.urgencySum / cluster.count;
    return {
      lat: Number((cluster.latSum / cluster.count).toFixed(6)),
      lng: Number((cluster.lngSum / cluster.count).toFixed(6)),
      needCount: cluster.count,
      avgUrgency: Number(averageUrgency.toFixed(2)),
      color: getUrgencyColor(averageUrgency),
      needs: cluster.needs
    };
  });
}

async function addPoint(payload) {
  return GeoPoint.create(payload);
}

async function getHeatmapData(filters = {}) {
  const minLat = toNumber(filters.minLat);
  const maxLat = toNumber(filters.maxLat);
  const minLng = toNumber(filters.minLng);
  const maxLng = toNumber(filters.maxLng);
  const zoom = toNumber(filters.zoom) || 8;
  const limit = Math.min(toNumber(filters.limit) || 5000, MAX_QUERY_ROWS);

  const where = buildNeedFilter({ minLat, maxLat, minLng, maxLng, region: filters.region });
  const needs = await Need.findAll({
    where,
    attributes: ["id", "title", "location", "locationLat", "locationLng", "urgencyScore", "aiLabel"],
    limit,
    raw: true
  });

  const precision = getClusterPrecision(zoom);
  const clusters = clusterNeeds(needs, precision);

  return {
    meta: {
      totalNeedsScanned: needs.length,
      totalClusters: clusters.length,
      precision,
      filters: { minLat, maxLat, minLng, maxLng, region: filters.region || null }
    },
    points: clusters
  };
}

async function getHotspots(filters = {}) {
  const heatmap = await getHeatmapData(filters);
  const minimumNeedCount = Math.max(2, toNumber(filters.minNeedCount) || 3);
  const top = Math.min(toNumber(filters.top) || 20, 100);

  const hotspots = heatmap.points
    .filter((point) => point.needCount >= minimumNeedCount)
    .sort((a, b) => {
      if (b.avgUrgency !== a.avgUrgency) return b.avgUrgency - a.avgUrgency;
      return b.needCount - a.needCount;
    })
    .slice(0, top);

  return {
    meta: {
      totalHotspots: hotspots.length,
      minimumNeedCount,
      top
    },
    hotspots
  };
}

async function getAreaSummary(location) {
  const needs = await Need.findAll({
    where: {
      location: { [Op.iLike]: `%${location}%` }
    },
    attributes: ["id", "urgencyScore", "aiLabel", "location"],
    raw: true
  });

  const summary = {
    totalNeeds: needs.length,
    byColor: { red: 0, orange: 0, yellow: 0, green: 0 },
    byCategory: {},
    averageUrgency: 0
  };

  if (!needs.length) {
    return { location, summary };
  }

  let urgencySum = 0;
  needs.forEach((need) => {
    const urgency = Number(need.urgencyScore || 0);
    const color = getUrgencyColor(urgency);
    summary.byColor[color] += 1;
    urgencySum += urgency;

    const category = need.aiLabel || "UNCLASSIFIED";
    summary.byCategory[category] = (summary.byCategory[category] || 0) + 1;
  });

  summary.averageUrgency = Number((urgencySum / needs.length).toFixed(2));
  return { location, summary };
}

module.exports = { addPoint, getHeatmapData, getHotspots, getAreaSummary };
