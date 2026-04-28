const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const isSqlite = sequelize.getDialect() === "sqlite";
const stringArrayType = isSqlite ? DataTypes.JSON : DataTypes.ARRAY(DataTypes.STRING);

const Task =
  sequelize.models.Task ||
  sequelize.define(
    "Task",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      needId: { type: DataTypes.UUID, allowNull: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      assignedTo: { type: DataTypes.UUID },
      requiredSkills: { type: stringArrayType, defaultValue: [] },
      requiredLanguage: { type: DataTypes.STRING },
      locationLat: { type: DataTypes.FLOAT },
      locationLng: { type: DataTypes.FLOAT },
      urgencyOverride: { type: DataTypes.FLOAT },
      dueDate: { type: DataTypes.DATE },
      firstResponseAt: { type: DataTypes.DATE },
      completedAt: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING, defaultValue: "OPEN" }
    },
    {
      indexes: [
        { fields: ["status"] },
        { fields: ["assignedTo"] },
        { fields: ["needId"] },
        { fields: ["createdAt"] },
        { fields: ["completedAt"] }
      ]
    }
  );

module.exports = { Task };
