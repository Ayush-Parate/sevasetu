async function processUploadedImage(file) {
  return {
    text: "OCR output placeholder",
    sourceFile: file?.filename || null,
    confidence: 0
  };
}

module.exports = { processUploadedImage };
