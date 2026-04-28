const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const uploadAndProcess = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw { statusCode: 400, message: "File is required" };
  }
  const fileRecord = await service.processFile(req.file);
  res.status(201).json({ success: true, data: fileRecord });
});

const listFiles = asyncHandler(async (_req, res) => {
  const files = await service.listFiles();
  res.json({ success: true, data: files });
});

const processTextInput = asyncHandler(async (req, res) => {
  const result = await service.processTextInput(req.body.text || "");
  res.status(200).json({ success: true, data: result });
});

const processVoiceInput = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw { statusCode: 400, message: "Voice file is required" };
  }
  const result = await service.processVoiceInput(req.file);
  res.status(200).json({ success: true, data: result });
});

module.exports = { uploadAndProcess, listFiles, processTextInput, processVoiceInput };
