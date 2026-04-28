const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Match =
  sequelize.models.Match ||
  sequelize.define("Match", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    needId: { type: DataTypes.UUID, allowNull: true },
    taskId: { type: DataTypes.UUID },
    volunteerId: { type: DataTypes.UUID, allowNull: false },
    score: { type: DataTypes.FLOAT, defaultValue: 0 },
    scoreBreakdown: { type: DataTypes.JSONB, defaultValue: {} },
    status: { type: DataTypes.STRING, defaultValue: "PENDING" }
  });

module.exports = { Match };
