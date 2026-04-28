require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./config/database");
const logger = require("./config/logger");
const { initModels } = require("./config/initModels");

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established");

    initModels();

    const isProd = (process.env.NODE_ENV || "development") === "production";
    const dialect = sequelize.getDialect();

    // SQLite + alter + foreign keys can be brittle; prefer a stable schema (seed uses force when needed).
    if (dialect === "sqlite") {
      await sequelize.sync();
    } else {
      await sequelize.sync({ alter: !isProd });
    }
    logger.info("Database models synchronized");

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to bootstrap server", { message: error.message });
    process.exit(1);
  }
}

bootstrap();
