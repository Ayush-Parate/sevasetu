const { User } = require("./models");

async function listUsers() {
  const users = await User.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).lean();
  return users.map((user) => ({
    ...user,
    id: String(user._id)
  }));
}

module.exports = { listUsers };
