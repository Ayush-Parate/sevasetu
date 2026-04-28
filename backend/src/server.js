require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./config/database");
const logger = require("./config/logger");
const { initModels } = require("./config/initModels");

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await connectToDatabase();
    logger.info("Database connection established");

    initModels();
    logger.info("Mongo models initialized");

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to bootstrap server", { message: error.message });
    process.exit(1);
  }
}

bootstrap();
