const logger = require("../config/logger");

function notFoundHandler(req, _res, next) {
  next({ statusCode: 404, message: `Route not found: ${req.originalUrl}` });
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  logger.error(err.message || "Unhandled error", { stack: err.stack });
  const isProd = (process.env.NODE_ENV || "development") === "production";
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(isProd ? {} : err.details ? { details: err.details } : {})
  });
}

module.exports = { notFoundHandler, errorHandler };
