const { ImpactMetric } = require("./models");
const { Task } = require("../taskManagement/models");
const { Need } = require("../needIntelligence/models");

async function createMetric(payload) {
  const metric = await ImpactMetric.create(payload);
  return metric.toJSON();
}

async function listMetrics() {
  return ImpactMetric.find({}).sort({ createdAt: -1 }).lean();
}

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

async function getImpactSummary(options = {}) {
  const trendLimit = Math.min(toPositiveInt(options.trendLimit, 30), 180);
  const [tasks, metrics] = await Promise.all([
    Task.find({}).lean(),
    ImpactMetric.find({}).lean()
  ]);

  const completedTasks = tasks.filter((task) => /^completed$/i.test(task.status || ""));
  const responseDurations = tasks
    .filter((task) => task.firstResponseAt && task.createdAt)
    .map((task) => (new Date(task.firstResponseAt).getTime() - new Date(task.createdAt).getTime()) / 1000);
  const resolutionDurations = tasks
    .filter((task) => task.completedAt && task.createdAt)
    .map((task) => (new Date(task.completedAt).getTime() - new Date(task.createdAt).getTime()) / 1000);

  const peopleHelpedTotal = metrics.reduce((sum, metric) => sum + Number(metric.peopleHelped || 0), 0);

  const areaMap = new Map();
  for (const metric of metrics) {
    if (!metric.location) continue;
    const current = areaMap.get(metric.location) || { location: metric.location, total: 0, count: 0 };
    current.total += Number(metric.areaImprovement || 0);
    current.count += 1;
    areaMap.set(metric.location, current);
  }

  const volunteerMap = new Map();
  for (const task of tasks) {
    if (!task.assignedTo) continue;
    const key = String(task.assignedTo);
    const current =
      volunteerMap.get(key) || { volunteerId: key, assignedCount: 0, completedCount: 0, resolutionHours: [] };
    current.assignedCount += 1;
    if (/^completed$/i.test(task.status || "")) {
      current.completedCount += 1;
    }
    if (task.completedAt && task.createdAt) {
      current.resolutionHours.push((new Date(task.completedAt).getTime() - new Date(task.createdAt).getTime()) / 3600000);
    }
    volunteerMap.set(key, current);
  }

  const volunteerPerformance = [...volunteerMap.values()]
    .map((row) => ({
      volunteerId: row.volunteerId,
      assignedCount: row.assignedCount,
      completedCount: row.completedCount,
      successRate: Number((row.assignedCount ? (row.completedCount / row.assignedCount) * 100 : 0).toFixed(2)),
      avgResolutionHours: Number(
        (
          row.resolutionHours.reduce((sum, value) => sum + value, 0) /
            (row.resolutionHours.length || 1)
        ).toFixed(2)
      )
    }))
    .sort((a, b) => b.completedCount - a.completedCount)
    .slice(0, 25);

  return {
    totals: {
      tasksCompleted: completedTasks.length,
      peopleHelped: peopleHelpedTotal
    },
    averages: {
      responseTimeHours: Number(
        (
          responseDurations.reduce((sum, value) => sum + value, 0) /
            ((responseDurations.length || 1) * 3600)
        ).toFixed(2)
      ),
      resolutionTimeHours: Number(
        (
          resolutionDurations.reduce((sum, value) => sum + value, 0) /
            ((resolutionDurations.length || 1) * 3600)
        ).toFixed(2)
      )
    },
    areaImprovementTrends: [...areaMap.values()]
      .map((row) => ({
        location: row.location,
        averageAreaImprovement: Number((row.total / row.count).toFixed(2)),
        dataPoints: row.count
      }))
      .sort((a, b) => b.averageAreaImprovement - a.averageAreaImprovement)
      .slice(0, trendLimit),
    volunteerPerformance
  };
}

async function getImpactByTask(taskId) {
  const task = await Task.findById(taskId).lean();
  if (!task) {
    throw { statusCode: 404, message: "Task not found" };
  }

  const [impactRecords, linkedNeed] = await Promise.all([
    ImpactMetric.find({ taskId }).sort({ createdAt: -1 }).lean(),
    task.needId ? Need.findById(task.needId).lean() : Promise.resolve(null)
  ]);

  const totalPeopleHelped = impactRecords.reduce((sum, row) => sum + Number(row.peopleHelped || 0), 0);
  const avgImpactScore =
    impactRecords.length > 0
      ? impactRecords.reduce((sum, row) => sum + Number(row.impactScore || 0), 0) / impactRecords.length
      : 0;

  return {
    task: {
      id: String(task._id),
      title: task.title,
      status: task.status,
      assignedTo: task.assignedTo,
      createdAt: task.createdAt,
      firstResponseAt: task.firstResponseAt,
      completedAt: task.completedAt
    },
    context: linkedNeed
      ? {
          needId: String(linkedNeed._id),
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

  const records = await ImpactMetric.find(
    { location: { $regex: location, $options: "i" } },
    { taskId: 1, peopleHelped: 1, impactScore: 1, areaImprovement: 1, timeTakenMinutes: 1, createdAt: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(historyLimit)
    .lean();

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
