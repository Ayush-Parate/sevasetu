const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const ImpactMetric =
  sequelize.models.ImpactMetric ||
  sequelize.define(
    "ImpactMetric",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      taskId: { type: DataTypes.UUID, allowNull: true },
      volunteerId: { type: DataTypes.UUID, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: true },
      peopleHelped: { type: DataTypes.INTEGER, defaultValue: 0 },
      timeTakenMinutes: { type: DataTypes.FLOAT, defaultValue: 0 },
      impactScore: { type: DataTypes.FLOAT, defaultValue: 0 },
      areaImprovement: { type: DataTypes.FLOAT, defaultValue: 0 },
      metricName: { type: DataTypes.STRING, allowNull: true },
      metricValue: { type: DataTypes.FLOAT, allowNull: true },
      periodLabel: { type: DataTypes.STRING, allowNull: true }
    },
    {
      indexes: [
        { fields: ["taskId"] },
        { fields: ["volunteerId"] },
        { fields: ["location"] },
        { fields: ["createdAt"] },
        { fields: ["impactScore"] }
      ]
    }
  );

module.exports = { ImpactMetric };
