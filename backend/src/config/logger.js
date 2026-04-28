const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");

const isServerless =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.NOW_REGION);

// Serverless filesystems are often read-only; avoid file logs there.
let fileTransport = null;
if (!isServerless) {
  try {
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    fileTransport = new transports.File({ filename: path.join(logDir, "app.log") });
  } catch {
    fileTransport = null;
  }
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    ...(fileTransport ? [fileTransport] : [])
  ]
});

module.exports = logger;
