const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const { ROLES } = require("../../constants/roles");

const isSqlite = sequelize.getDialect() === "sqlite";
const stringArrayType = isSqlite ? DataTypes.JSON : DataTypes.ARRAY(DataTypes.STRING);

const User =
  sequelize.models.User ||
  sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM(...Object.values(ROLES)), allowNull: false },
    phone: { type: DataTypes.STRING },
    skills: { type: stringArrayType, defaultValue: [] },
    languages: { type: stringArrayType, defaultValue: [] },
    locationLat: { type: DataTypes.FLOAT },
    locationLng: { type: DataTypes.FLOAT },
    availabilityStatus: { type: DataTypes.STRING, defaultValue: "unavailable" },
    trustScore: { type: DataTypes.FLOAT, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    // Rotating refresh token storage (hashed). Null => logged out everywhere.
    refreshTokenHash: { type: DataTypes.STRING, allowNull: true },
    refreshTokenExpiresAt: { type: DataTypes.DATE, allowNull: true }
  });

module.exports = { User };
