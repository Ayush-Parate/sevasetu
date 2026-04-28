const { Task } = require("./models");

async function createTask(payload) {
  return Task.create(payload);
}

async function listTasks() {
  return Task.findAll();
}

module.exports = { createTask, listTasks };
