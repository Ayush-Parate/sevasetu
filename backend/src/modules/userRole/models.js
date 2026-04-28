const { mongoose } = require("../../config/database");
const { ROLES } = require("../../constants/roles");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), required: true },
    phone: { type: String, default: null },
    skills: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    locationLat: { type: Number, default: null },
    locationLng: { type: Number, default: null },
    availabilityStatus: { type: String, default: "unavailable" },
    trustScore: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    refreshTokenHash: { type: String, default: null },
    refreshTokenExpiresAt: { type: Date, default: null }
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = { User };
