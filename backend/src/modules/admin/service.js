const { User } = require("../userRole/models");
const { Need } = require("../needIntelligence/models");
const { Task } = require("../taskManagement/models");
const { ROLES } = require("../../constants/roles");

const { mongoose } = require("../../config/database");

async function getAdminStats() {
  const [totalUsers, activeNGOs, activeNeeds, completedTasks] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: ROLES.NGO_ADMIN, isActive: true }),
    Need.countDocuments({}),
    Task.countDocuments({ status: "COMPLETED" })
  ]);
  return { totalUsers, activeNGOs, activeNeeds, completedTasks };
}

/**
 * Suspicious reports: Needs with very similar titles (short title, high frequency)
 * or needs with urgencyScore = 10 that were created within a 24h burst.
 */
async function getSuspiciousNeeds() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Find needs created in the last 24h with urgencyScore >= 8
  const recentHighUrgency = await Need.find({
    urgencyScore: { $gte: 8 },
    createdAt: { $gte: oneDayAgo }
  })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  // Group by location to detect location-based duplicates
  const locationGroups = {};
  for (const need of recentHighUrgency) {
    const key = need.location || "unknown";
    if (!locationGroups[key]) locationGroups[key] = [];
    locationGroups[key].push(need);
  }

  const suspicious = [];
  for (const [location, needs] of Object.entries(locationGroups)) {
    if (needs.length >= 2) {
      suspicious.push({
        id: needs[0]._id.toString(),
        title: needs[0].title,
        location,
        count: needs.length,
        riskLevel: needs.length >= 4 ? "HIGH" : "MEDIUM",
        description: `${needs.length} high-urgency needs reported at this location within 24 hours — potential duplicate inflation.`,
        createdAt: needs[0].createdAt
      });
    }
  }

  // Also flag any needs that have urgencyScore maxed out (10)
  const maxUrgency = await Need.find({ urgencyScore: 10 })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  for (const need of maxUrgency) {
    if (!suspicious.find((s) => s.id === need._id.toString())) {
      suspicious.push({
        id: need._id.toString(),
        title: need.title,
        location: need.location || "Unknown",
        count: 1,
        riskLevel: "MEDIUM",
        description: "Need reported with maximum urgency score (10) — manual review recommended.",
        createdAt: need.createdAt
      });
    }
  }

  return suspicious.slice(0, 10);
}

/**
 * Flagged volunteers: Users with low trust score or volunteers with anomalously
 * many completed tasks in a short timeframe.
 */
async function getFlaggedVolunteers() {
  const volunteers = await User.find(
    { role: { $in: [ROLES.VOLUNTEER, ROLES.FIELD_COORDINATOR] }, isActive: true },
    { passwordHash: 0, refreshTokenHash: 0 }
  )
    .sort({ trustScore: 1 })
    .limit(20)
    .lean();

  const flagged = [];
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  for (const vol of volunteers) {
    const recentCompleted = await Task.countDocuments({
      assignedTo: vol._id,
      status: "COMPLETED",
      completedAt: { $gte: oneWeekAgo }
    });

    const score = vol.trustScore || 0;
    // Flag: low trust OR abnormally high task completion volume
    if (score < 3 || recentCompleted > 10) {
      const probability = Math.min(99, 50 + recentCompleted * 5 + (3 - Math.min(score, 3)) * 10);
      flagged.push({
        id: vol._id.toString(),
        fullName: vol.fullName,
        email: vol.email,
        role: vol.role,
        trustScore: score,
        recentCompletedTasks: recentCompleted,
        probability,
        pattern: recentCompleted > 10 ? "Abnormal task completion volume" : "Low trust score",
        severity: recentCompleted > 20 || score < 1 ? "HIGH" : "MEDIUM"
      });
    }
  }

  return flagged.slice(0, 10);
}

async function updateVolunteerTrustScore(userId, delta) {
  const user = await User.findById(userId);
  if (!user) throw { statusCode: 404, message: "User not found" };
  user.trustScore = Math.max(0, Math.min(10, (user.trustScore || 0) + delta));
  await user.save();
  return { id: user.id, trustScore: user.trustScore };
}

async function getPlatformAnalytics() {
  const [totalUsers, totalNeeds, totalTasks, completedTasks, openTasks] = await Promise.all([
    User.countDocuments({}),
    Need.countDocuments({}),
    Task.countDocuments({}),
    Task.countDocuments({ status: "COMPLETED" }),
    Task.countDocuments({ status: "OPEN" })
  ]);

  // User role breakdown
  const roleGroups = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);
  const roleDistribution = roleGroups.reduce((acc, g) => {
    acc[g._id] = g.count;
    return acc;
  }, {});

  // Monthly user growth (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const userGrowth = await User.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    { $group: {
      _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
      count: { $sum: 1 }
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  const resolutionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  return {
    totalUsers,
    totalNeeds,
    totalTasks,
    completedTasks,
    openTasks,
    resolutionRate: parseFloat(resolutionRate),
    roleDistribution,
    userGrowth: userGrowth.map(g => ({
      label: `${g._id.year}-${String(g._id.month).padStart(2, '0')}`,
      count: g.count
    }))
  };
}

async function getEmergencyStats() {
  const criticalNeeds = await Need.countDocuments({ urgencyScore: { $gte: 9 } });
  const urgentNeeds = await Need.countDocuments({ urgencyScore: { $gte: 7, $lt: 9 } });
  const availableVolunteers = await User.countDocuments({
    role: { $in: [ROLES.VOLUNTEER, ROLES.FIELD_COORDINATOR] },
    isActive: true,
    availabilityStatus: "available"
  });
  const activeNGOs = await User.countDocuments({ role: ROLES.NGO_ADMIN, isActive: true });

  return { criticalNeeds, urgentNeeds, availableVolunteers, activeNGOs };
}

async function getRoleDistribution() {
  const groups = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);
  return groups.map(g => ({ role: g._id, count: g.count }));
}

module.exports = { getAdminStats, getSuspiciousNeeds, getFlaggedVolunteers, updateVolunteerTrustScore, getPlatformAnalytics, getEmergencyStats, getRoleDistribution };
