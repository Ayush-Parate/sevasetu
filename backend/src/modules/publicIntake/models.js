const { mongoose } = require("../../config/database");

const publicIntakeSchema = new mongoose.Schema(
  {
    requestType: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, default: null },
    organizationName: { type: String, default: null },
    roleRequested: { type: String, default: null },
    message: { type: String, default: null },
    source: { type: String, default: "web" },
    status: { type: String, default: "NEW", index: true },
    reviewNotes: { type: String, default: null },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    approvedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
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

const PublicIntake = mongoose.models.PublicIntake || mongoose.model("PublicIntake", publicIntakeSchema);

module.exports = { PublicIntake };
