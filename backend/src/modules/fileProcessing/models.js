const { mongoose } = require("../../config/database");

const processedFileSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    storedPath: { type: String, required: true },
    mimeType: { type: String, required: true },
    extractedText: { type: String, default: null },
    ocrConfidence: { type: Number, default: 0 }
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

const ProcessedFile = mongoose.models.ProcessedFile || mongoose.model("ProcessedFile", processedFileSchema);

module.exports = { ProcessedFile };
