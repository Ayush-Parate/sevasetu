const { fn, col, literal, Op } = require("sequelize");
const { ImpactMetric } = require("./models");
const { Task } = require("../taskManagement/models");
const { Need } = require("../needIntelligence/models");

async function createMetric(payload) {
  return ImpactMetric.create(payload);
}

async function listMetrics() {
  return ImpactMetric.findAll();
}

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

async function getImpactSummary(options = {}) {
  const trendLimit = Math.min(toPositiveInt(options.trendLimit, 30), 180);

  const [totalTasksCompleted, avgResponseSec, avgResolutionSec, peopleHelpedAgg, areaTrendsRows, volunteerRows] =
    await Promise.all([
      Task.count({ where: { status: { [Op.iLike]: "completed" } } }),
      Task.findOne({
        attributes: [
          [fn("AVG", literal('EXTRACT(EPOCH FROM ("firstResponseAt" - "createdAt"))')), "avgResponseSeconds"]
        ],
        where: { firstResponseAt: { [Op.ne]: null } },
        raw: true
      }),
      Task.findOne({
        attributes: [
          [fn("AVG", literal('EXTRACT(EPOCH FROM ("completedAt" - "createdAt"))')), "avgResolutionSeconds"]
        ],
        where: { completedAt: { [Op.ne]: null } },
        raw: true
      }),
      ImpactMetric.findOne({
        attributes: [[fn("COALESCE", fn("SUM", col("peopleHelped")), 0), "peopleHelped"]],
        raw: true
      }),
      ImpactMetric.findAll({
        attributes: [
          "location",
          [fn("AVG", col("areaImprovement")), "averageAreaImprovement"],
          [fn("COUNT", col("id")), "dataPoints"]
        ],
        where: { location: { [Op.ne]: null } },
        group: ["location"],
        order: [[literal('"averageAreaImprovement"'), "DESC"]],
        limit: trendLimit,
        raw: true
      }),
      Task.findAll({
        attributes: [
          "assignedTo",
          [fn("COUNT", col("id")), "assignedCount"],
          [fn("SUM", literal(`CASE WHEN status ILIKE 'completed' THEN 1 ELSE 0 END`)), "completedCount"],
          [
            fn(
              "AVG",
              literal(`CASE WHEN "completedAt" IS NOT NULL THEN EXTRACT(EPOCH FROM ("completedAt" - "createdAt")) END`)
            ),
            "avgResolutionSeconds"
          ]
        ],
        where: { assignedTo: { [Op.ne]: null } },
        group: ["assignedTo"],
        order: [[literal('"completedCount"'), "DESC"]],
        limit: 25,
        raw: true
      })
    ]);

  const volunteerPerformance = volunteerRows.map((row) => {
    const assignedCount = Number(row.assignedCount || 0);
    const completedCount = Number(row.completedCount || 0);
    const successRate = assignedCount ? (completedCount / assignedCount) * 100 : 0;
    return {
      volunteerId: row.assignedTo,
      assignedCount,
      completedCount,
      successRate: Number(successRate.toFixed(2)),
      avgResolutionHours: Number(((Number(row.avgResolutionSeconds || 0) / 3600) || 0).toFixed(2))
    };
  });

  return {
    totals: {
      tasksCompleted: totalTasksCompleted,
      peopleHelped: Number(peopleHelpedAgg?.peopleHelped || 0)
    },
    averages: {
      responseTimeHours: Number(((Number(avgResponseSec?.avgResponseSeconds || 0) / 3600) || 0).toFixed(2)),
      resolutionTimeHours: Number(((Number(avgResolutionSec?.avgResolutionSeconds || 0) / 3600) || 0).toFixed(2))
    },
    areaImprovementTrends: areaTrendsRows.map((row) => ({
      location: row.location,
      averageAreaImprovement: Number(Number(row.averageAreaImprovement || 0).toFixed(2)),
      dataPoints: Number(row.dataPoints || 0)
    })),
    volunteerPerformance
  };
}

async function getImpactByTask(taskId) {
  const task = await Task.findByPk(taskId, { raw: true });
  if (!task) {
    throw { statusCode: 404, message: "Task not found" };
  }

  const [impactRecords, linkedNeed] = await Promise.all([
    ImpactMetric.findAll({ where: { taskId }, order: [["createdAt", "DESC"]], raw: true }),
    task.needId ? Need.findByPk(task.needId, { raw: true }) : Promise.resolve(null)
  ]);

  const totalPeopleHelped = impactRecords.reduce((sum, row) => sum + Number(row.peopleHelped || 0), 0);
  const avgImpactScore =
    impactRecords.length > 0
      ? impactRecords.reduce((sum, row) => sum + Number(row.impactScore || 0), 0) / impactRecords.length
      : 0;

  return {
    task: {
      id: task.id,
      title: task.title,
      status: task.status,
      assignedTo: task.assignedTo,
      createdAt: task.createdAt,
      firstResponseAt: task.firstResponseAt,
      completedAt: task.completedAt
    },
    context: linkedNeed
      ? {
          needId: linkedNeed.id,
          needLocation: linkedNeed.location,
          needUrgency: linkedNeed.urgencyScore
        }
      : null,
    metrics: {
      recordsCount: impactRecords.length,
      totalPeopleHelped,
      averageImpactScore: Number(avgImpactScore.toFixed(2))
    },
    records: impactRecords
  };
}

async function getImpactByArea(location, options = {}) {
  const historyLimit = Math.min(toPositiveInt(options.historyLimit, 90), 365);

  const records = await ImpactMetric.findAll({
    where: { location: { [Op.iLike]: `%${location}%` } },
    attributes: ["id", "taskId", "peopleHelped", "impactScore", "areaImprovement", "timeTakenMinutes", "createdAt"],
    order: [["createdAt", "DESC"]],
    limit: historyLimit,
    raw: true
  });

  const byDay = new Map();
  records.forEach((row) => {
    const day = new Date(row.createdAt).toISOString().slice(0, 10);
    if (!byDay.has(day)) {
      byDay.set(day, { date: day, peopleHelped: 0, avgImpactScore: 0, avgAreaImprovement: 0, count: 0 });
    }
    const bucket = byDay.get(day);
    bucket.peopleHelped += Number(row.peopleHelped || 0);
    bucket.avgImpactScore += Number(row.impactScore || 0);
    bucket.avgAreaImprovement += Number(row.areaImprovement || 0);
    bucket.count += 1;
  });

  const trend = [...byDay.values()]
    .map((row) => ({
      date: row.date,
      peopleHelped: row.peopleHelped,
      avgImpactScore: Number((row.avgImpactScore / row.count).toFixed(2)),
      avgAreaImprovement: Number((row.avgAreaImprovement / row.count).toFixed(2))
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const totals = records.reduce(
    (acc, row) => {
      acc.peopleHelped += Number(row.peopleHelped || 0);
      acc.impactScore += Number(row.impactScore || 0);
      acc.areaImprovement += Number(row.areaImprovement || 0);
      return acc;
    },
    { peopleHelped: 0, impactScore: 0, areaImprovement: 0 }
  );

  return {
    location,
    summary: {
      records: records.length,
      totalPeopleHelped: totals.peopleHelped,
      averageImpactScore: Number((records.length ? totals.impactScore / records.length : 0).toFixed(2)),
      averageAreaImprovement: Number((records.length ? totals.areaImprovement / records.length : 0).toFixed(2))
    },
    trend
  };
}

module.exports = { createMetric, listMetrics, getImpactSummary, getImpactByTask, getImpactByArea };
