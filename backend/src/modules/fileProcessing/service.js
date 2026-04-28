const { ProcessedFile } = require("./models");
const { processUploadedImage } = require("../../utils/ocrService");

async function processFile(file) {
  const ocr = await processUploadedImage(file);
  const record = await ProcessedFile.create({
    originalName: file.originalname,
    storedPath: file.path,
    mimeType: file.mimetype,
    extractedText: ocr.text,
    ocrConfidence: ocr.confidence
  });
  return record.toJSON();
}

async function listFiles() {
  return ProcessedFile.find({}).sort({ createdAt: -1 }).lean();
}

async function processTextInput(text) {
  return {
    mode: "TEXT",
    normalizedText: text.trim(),
    classificationReady: true
  };
}

async function processVoiceInput(file) {
  return {
    mode: "VOICE",
    transcript: `Transcription placeholder for ${file.originalname}`,
    classificationReady: true
  };
}

module.exports = { processFile, listFiles, processTextInput, processVoiceInput };
