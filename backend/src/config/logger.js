const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
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
    new transports.File({ filename: path.join(logDir, "app.log") })
  ]
});

module.exports = logger;
