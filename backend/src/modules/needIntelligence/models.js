const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Need =
  sequelize.models.Need ||
  sequelize.define(
    "Need",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      location: { type: DataTypes.STRING },
      locationLat: { type: DataTypes.FLOAT },
      locationLng: { type: DataTypes.FLOAT },
      urgencyScore: { type: DataTypes.FLOAT, defaultValue: 0 },
      priorityScore: { type: DataTypes.FLOAT, defaultValue: 0 },
      aiLabel: { type: DataTypes.STRING, defaultValue: "UNCLASSIFIED" }
    },
    {
      indexes: [
        { fields: ["locationLat"] },
        { fields: ["locationLng"] },
        { fields: ["urgencyScore"] },
        { fields: ["location"] }
      ]
    }
  );

module.exports = { Need };
