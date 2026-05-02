const { Task } = require("../taskManagement/models");
const { Need } = require("../needIntelligence/models");

async function getVolunteerStats(userId) {
  // Aggregate stats specific to the volunteer
  const tasks = await Task.find({ assignedTo: userId });

  const completedTasks = tasks.filter(t => t.status === "COMPLETED").length;
  const activeTasks = tasks.filter(t => t.status === "IN_PROGRESS" || t.status === "OPEN").length;
  const impactScore = completedTasks * 15; // Mock logic: 15 points per task
  
  return {
    activeTasks,
    completedTasks,
    impactScore,
    trustScore: 9.8, // Typically this would be calculated from rating/feedback
    hoursLogged: completedTasks * 2, // Mock logic: 2 hours per completed task
    rank: "Gold"
  };
}

module.exports = { getVolunteerStats };
