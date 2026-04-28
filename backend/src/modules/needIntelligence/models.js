const { mongoose } = require("../../config/database");

const needSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, default: null },
    locationLat: { type: Number, default: null, index: true },
    locationLng: { type: Number, default: null, index: true },
    urgencyScore: { type: Number, default: 0, index: true },
    priorityScore: { type: Number, default: 0 },
    aiLabel: { type: String, default: "UNCLASSIFIED" }
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

needSchema.index({ location: 1 });

const Need = mongoose.models.Need || mongoose.model("Need", needSchema);

module.exports = { Need };
