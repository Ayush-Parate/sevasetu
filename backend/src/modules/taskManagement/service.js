const { Task } = require("./models");
const { User } = require("../userRole/models");

async function createTask(payload) {
  const task = await Task.create({
    ...payload,
    needId: payload.needId || null,
    assignedTo: payload.assignedTo || null
  });
  return task.toJSON();
}

async function listTasks() {
  return Task.find({})
    .populate("assignedTo", "fullName email")
    .sort({ createdAt: -1 })
    .lean()
    .then((tasks) =>
      tasks.map((task) => ({
        ...task,
        id: String(task._id),
        assignee: task.assignedTo
          ? {
              id: String(task.assignedTo._id),
              fullName: task.assignedTo.fullName,
              email: task.assignedTo.email
            }
          : null
      }))
    );
}

async function assignTask(taskId, volunteerId) {
  const task = await Task.findById(taskId);
  if (!task) throw { statusCode: 404, message: "Task not found" };

  const volunteer = await User.findById(volunteerId);
  if (!volunteer) throw { statusCode: 404, message: "Volunteer not found" };

  task.assignedTo = volunteerId;
  task.status = "ASSIGNED";
  task.firstResponseAt = task.firstResponseAt || new Date();
  await task.save();

  const populated = await Task.findById(taskId).populate("assignedTo", "fullName email").lean();
  return {
    ...populated,
    id: String(populated._id),
    assignee: populated.assignedTo
      ? {
          id: String(populated.assignedTo._id),
          fullName: populated.assignedTo.fullName,
          email: populated.assignedTo.email
        }
      : null
  };
}

async function updateTaskStatus(taskId, status) {
  const task = await Task.findById(taskId);
  if (!task) throw { statusCode: 404, message: "Task not found" };

  task.status = status;
  if (status === "COMPLETED" && !task.completedAt) {
    task.completedAt = new Date();
  }
  await task.save();
  return task.toJSON();
}

module.exports = { createTask, listTasks, assignTask, updateTaskStatus };
