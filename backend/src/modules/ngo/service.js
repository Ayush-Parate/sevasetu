const { User } = require("../userRole/models");
const { Need } = require("../needIntelligence/models");
const { Task } = require("../taskManagement/models");
const { ROLES } = require("../../constants/roles");

/**
 * Aggregated stats for the NGO Admin dashboard mission control cards.
 * All counts are platform-wide (scoped per-NGO would need an orgId field on records).
 */
async function getNGOStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalNeeds,
    criticalNeeds,
    highPriorityNeeds,
    pendingNeeds,
    totalVolunteers,
    availableVolunteers,
    onTaskVolunteers,
    totalTasks,
    completedTasks,
    completedToday,
    completedThisWeek,
    openTasks,
  ] = await Promise.all([
    Need.countDocuments({}),
    Need.countDocuments({ urgencyScore: { $gte: 9 } }),
    Need.countDocuments({ urgencyScore: { $gte: 7, $lt: 9 } }),
    Need.countDocuments({ status: "pending" }),
    User.countDocuments({ role: ROLES.VOLUNTEER, isActive: true }),
    User.countDocuments({ role: ROLES.VOLUNTEER, isActive: true, availabilityStatus: "available" }),
    User.countDocuments({ role: ROLES.VOLUNTEER, isActive: true, availabilityStatus: "on_task" }),
    Task.countDocuments({}),
    Task.countDocuments({ status: "COMPLETED" }),
    Task.countDocuments({ status: "COMPLETED", completedAt: { $gte: today } }),
    Task.countDocuments({ status: "COMPLETED", completedAt: { $gte: weekAgo } }),
    Task.countDocuments({ status: "OPEN" }),
  ]);

  const resolutionRate = totalTasks > 0
    ? parseFloat(((completedTasks / totalTasks) * 100).toFixed(1))
    : 0;

  return {
    needs: {
      total: totalNeeds,
      critical: criticalNeeds,
      highPriority: highPriorityNeeds,
      pending: pendingNeeds,
    },
    volunteers: {
      total: totalVolunteers,
      available: availableVolunteers,
      onTask: onTaskVolunteers,
      emergencyResponders: Math.floor(availableVolunteers * 0.13), // approx
    },
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      completedToday,
      completedThisWeek,
      open: openTasks,
      resolutionRate,
    },
  };
}

/**
 * List volunteers with role VOLUNTEER, optionally filtered by status.
 */
async function listVolunteers({ status, limit = 50 } = {}) {
  const query = { role: ROLES.VOLUNTEER, isActive: true };
  if (status) query.availabilityStatus = status;

  const volunteers = await User.find(query, { passwordHash: 0, refreshTokenHash: 0 })
    .sort({ trustScore: -1 })
    .limit(limit)
    .lean();

  // Enrich with task counts
  const enriched = await Promise.all(
    volunteers.map(async (v) => {
      const taskCount = await Task.countDocuments({ assignedTo: v._id });
      const completedCount = await Task.countDocuments({ assignedTo: v._id, status: "COMPLETED" });
      return {
        ...v,
        id: v._id.toString(),
        taskCount,
        completedCount,
        successRate: taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0,
      };
    })
  );

  return enriched;
}

/**
 * List field coordinators.
 */
async function listFieldCoordinators() {
  const coordinators = await User.find(
    { role: ROLES.FIELD_COORDINATOR, isActive: true },
    { passwordHash: 0, refreshTokenHash: 0 }
  )
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();

  const enriched = await Promise.all(
    coordinators.map(async (c) => {
      const activeTasks = await Task.countDocuments({ assignedTo: c._id, status: "OPEN" });
      return { ...c, id: c._id.toString(), activeTasks };
    })
  );

  return enriched;
}

module.exports = { getNGOStats, listVolunteers, listFieldCoordinators };
