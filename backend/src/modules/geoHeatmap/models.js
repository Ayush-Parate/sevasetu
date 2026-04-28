const { mongoose } = require("../../config/database");

const geoPointSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    intensity: { type: Number, default: 1 },
    category: { type: String, default: "GENERAL" }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      }
    }
  }
);

const GeoPoint = mongoose.models.GeoPoint || mongoose.model("GeoPoint", geoPointSchema);

module.exports = { GeoPoint };
