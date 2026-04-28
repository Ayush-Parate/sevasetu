const { sequelize } = require("./database");

// Import all models so `sequelize.sync()` creates the full schema.
// Also define lightweight associations between modules.
function initModels() {
  // Core user model
  const { User } = require("../modules/userRole/models");

  // Domain models
  const { Need } = require("../modules/needIntelligence/models");
  const { Task } = require("../modules/taskManagement/models");
  const { Match } = require("../modules/volunteerMatching/models");
  const { GeoPoint } = require("../modules/geoHeatmap/models");
  const { ImpactMetric } = require("../modules/impactAnalytics/models");
  const { ProcessedFile } = require("../modules/fileProcessing/models");

  // Associations (kept optional to avoid hard constraints in early scaffolds)
  if (!Task.associations?.need) {
    Task.belongsTo(Need, { foreignKey: "needId", as: "need" });
    Need.hasMany(Task, { foreignKey: "needId", as: "tasks" });
  }

  if (!Task.associations?.assignee) {
    Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });
    User.hasMany(Task, { foreignKey: "assignedTo", as: "assignedTasks" });
  }

  if (!Match.associations?.task) {
    Match.belongsTo(Task, { foreignKey: "taskId", as: "task" });
    Task.hasMany(Match, { foreignKey: "taskId", as: "matches" });
  }

  if (!Match.associations?.volunteer) {
    Match.belongsTo(User, { foreignKey: "volunteerId", as: "volunteer" });
    User.hasMany(Match, { foreignKey: "volunteerId", as: "matches" });
  }

  if (!ImpactMetric.associations?.task) {
    ImpactMetric.belongsTo(Task, { foreignKey: "taskId", as: "task" });
    Task.hasMany(ImpactMetric, { foreignKey: "taskId", as: "impactMetrics" });
  }

  if (!ImpactMetric.associations?.volunteer) {
    ImpactMetric.belongsTo(User, { foreignKey: "volunteerId", as: "volunteer" });
    User.hasMany(ImpactMetric, { foreignKey: "volunteerId", as: "impactMetrics" });
  }

  // Avoid unused var lint noise while still ensuring models are registered.
  return { sequelize, User, Need, Task, Match, GeoPoint, ImpactMetric, ProcessedFile };
}

module.exports = { initModels };

