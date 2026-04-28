const { mongoose } = require("../../config/database");

const taskSchema = new mongoose.Schema(
  {
    needId: { type: mongoose.Schema.Types.ObjectId, ref: "Need", default: null, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    requiredSkills: { type: [String], default: [] },
    requiredLanguage: { type: String, default: null },
    locationLat: { type: Number, default: null },
    locationLng: { type: Number, default: null },
    urgencyOverride: { type: Number, default: null },
    dueDate: { type: Date, default: null },
    volunteerRequirement: { type: Number, default: 1 },
    proofRequired: { type: [String], default: [] },
    firstResponseAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    status: { type: String, default: "OPEN", index: true }
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

taskSchema.index({ completedAt: 1 });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = { Task };
