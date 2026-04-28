require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./config/database");
const logger = require("./config/logger");
const { initModels } = require("./config/initModels");

const PORT = process.env.PORT || 5000;

let initPromise;
async function ensureInitialized() {
  if (!initPromise) {
    initPromise = (async () => {
      await connectToDatabase();
      logger.info("Database connection established");

      initModels();
      logger.info("Mongo models initialized");
    })().catch((error) => {
      // Reset so a future invocation can retry.
      initPromise = undefined;
      throw error;
    });
  }
  return initPromise;
}

const isServerless =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.NOW_REGION);

if (isServerless) {
  module.exports = async (req, res) => {
    try {
      await ensureInitialized();
      return app(req, res);
    } catch (error) {
      logger.error("Serverless handler initialization failed", { message: error?.message });
      res.status(500).json({ success: false, message: "Backend initialization failed" });
    }
  };
} else {
  async function bootstrap() {
    try {
      await ensureInitialized();
      app.listen(PORT, () => {
        logger.info(`Server listening on port ${PORT}`);
      });
    } catch (error) {
      logger.error("Failed to bootstrap server", { message: error.message });
      process.exit(1);
    }
  }

  bootstrap();
}
