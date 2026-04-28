const { Sequelize } = require("sequelize");

const dialect = (process.env.DB_DIALECT || "postgres").toLowerCase();

const sequelize =
  dialect === "sqlite"
    ? new Sequelize({
        dialect: "sqlite",
        storage: process.env.DB_STORAGE || "janconnect.sqlite",
        logging: false
      })
    : new Sequelize(
        process.env.DB_NAME || "janconnect",
        process.env.DB_USER || "postgres",
        process.env.DB_PASSWORD || "postgres",
        {
          host: process.env.DB_HOST || "localhost",
          port: process.env.DB_PORT || 5432,
          dialect: "postgres",
          logging: false
        }
      );

module.exports = { sequelize };
