const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const ProcessedFile =
  sequelize.models.ProcessedFile ||
  sequelize.define("ProcessedFile", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    originalName: { type: DataTypes.STRING, allowNull: false },
    storedPath: { type: DataTypes.STRING, allowNull: false },
    mimeType: { type: DataTypes.STRING, allowNull: false },
    extractedText: { type: DataTypes.TEXT },
    ocrConfidence: { type: DataTypes.FLOAT, defaultValue: 0 }
  });

module.exports = { ProcessedFile };
