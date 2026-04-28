const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const GeoPoint =
  sequelize.models.GeoPoint ||
  sequelize.define("GeoPoint", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
    intensity: { type: DataTypes.FLOAT, defaultValue: 1 },
    category: { type: DataTypes.STRING, defaultValue: "GENERAL" }
  });

module.exports = { GeoPoint };
