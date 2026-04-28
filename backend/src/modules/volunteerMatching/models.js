const { mongoose } = require("../../config/database");

const matchSchema = new mongoose.Schema(
  {
    needId: { type: mongoose.Schema.Types.ObjectId, ref: "Need", default: null },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true, index: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    score: { type: Number, default: 0 },
    scoreBreakdown: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, default: "PENDING" }
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

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

module.exports = { Match };
