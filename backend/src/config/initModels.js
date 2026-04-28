function initModels() {
  const { User } = require("../modules/userRole/models");
  const { Need } = require("../modules/needIntelligence/models");
  const { Task } = require("../modules/taskManagement/models");
  const { Match } = require("../modules/volunteerMatching/models");
  const { GeoPoint } = require("../modules/geoHeatmap/models");
  const { ImpactMetric } = require("../modules/impactAnalytics/models");
  const { ProcessedFile } = require("../modules/fileProcessing/models");
  const { PublicIntake } = require("../modules/publicIntake/models");

  return { User, Need, Task, Match, GeoPoint, ImpactMetric, ProcessedFile, PublicIntake };
}

module.exports = { initModels };
