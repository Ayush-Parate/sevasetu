const { mongoose } = require("../../config/database");

const impactMetricSchema = new mongoose.Schema(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: null, index: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    location: { type: String, default: null, index: true },
    peopleHelped: { type: Number, default: 0 },
    timeTakenMinutes: { type: Number, default: 0 },
    impactScore: { type: Number, default: 0, index: true },
    areaImprovement: { type: Number, default: 0 },
    metricName: { type: String, default: null },
    metricValue: { type: Number, default: null },
    periodLabel: { type: String, default: null }
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

const ImpactMetric = mongoose.models.ImpactMetric || mongoose.model("ImpactMetric", impactMetricSchema);

module.exports = { ImpactMetric };
