const { Need } = require("../needIntelligence/models");
const { Task } = require("../taskManagement/models");
const { User } = require("../userRole/models");
const { ROLES } = require("../../constants/roles");

async function getFCStats(userId, locationLng) {
  // We approximate local scoping by matching the user's longitude/latitude 
  // In a real app, this would use a geospatial $near query or defined zone IDs
  // For now, we'll fetch general metrics but query for Tasks assigned to this FC

  const [
    assignedTasks,
    completedTasks,
    pendingVerifications,
    activeVolunteers,
    emergencyAlerts
  ] = await Promise.all([
    Task.countDocuments({ assignedTo: userId, status: "OPEN" }),
    Task.countDocuments({ assignedTo: userId, status: "COMPLETED" }),
    Need.countDocuments({ status: "pending" }), // Needs verification
    User.countDocuments({ role: ROLES.VOLUNTEER, availabilityStatus: "available", isActive: true }),
    Need.countDocuments({ urgencyScore: { $gte: 9 } })
  ]);

  const totalAssigned = assignedTasks + completedTasks;
  const resolutionRate = totalAssigned > 0 ? ((completedTasks / totalAssigned) * 100).toFixed(1) : 0;

  return {
    assignedTasks,
    completedTasks,
    resolutionRate,
    pendingVerifications,
    activeVolunteers,
    emergencyAlerts,
    responseSpeed: "14m", // Placeholder
    communityTrust: "9.2" // Placeholder
  };
}

async function listVolunteers(locationLng) {
  // In a real implementation this would filter by the FC's zone/location.
  // For now, we return volunteers but we can mock distances if needed.
  return User.find({ role: ROLES.VOLUNTEER }).lean();
}

module.exports = { getFCStats, listVolunteers };
