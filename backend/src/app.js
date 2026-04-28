const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");
const logger = require("./config/logger");

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Service healthy" });
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
