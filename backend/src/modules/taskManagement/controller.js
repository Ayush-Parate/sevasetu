const { asyncHandler } = require("../../utils/asyncHandler");
const service = require("./service");

const createTask = asyncHandler(async (req, res) => {
  const task = await service.createTask(req.body);
  res.status(201).json({ success: true, data: task });
});

const listTasks = asyncHandler(async (_req, res) => {
  const tasks = await service.listTasks();
  res.json({ success: true, data: tasks });
});

module.exports = { createTask, listTasks };
