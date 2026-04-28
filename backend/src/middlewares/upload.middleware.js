const fs = require("fs");
const path = require("path");
const multer = require("multer");

const isServerless =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.NOW_REGION);

// In serverless environments, the project filesystem may be read-only.
// Vercel allows writing to /tmp. If that fails, fall back to in-memory uploads.
const uploadDir = isServerless ? path.join("/tmp", "uploads") : path.join(process.cwd(), "uploads");

let canWriteToDisk = true;
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch {
  canWriteToDisk = false;
}

const storage = canWriteToDisk
  ? multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadDir),
      filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`)
    })
  : multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = { upload };
