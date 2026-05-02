const { User } = require("./models");

async function listUsers() {
  const users = await User.find(
    {},
    {
      passwordHash: 0,
      refreshTokenHash: 0,
      emailVerificationTokenHash: 0,
      passwordResetTokenHash: 0
    }
  )
    .sort({ createdAt: -1 })
    .lean();
  return users.map((user) => ({
    ...user,
    id: String(user._id)
  }));
}

async function updateUserStatus(userId, isActive) {
  const user = await User.findById(userId);
  if (!user) throw { statusCode: 404, message: "User not found" };
  if (user.role === "SUPER_ADMIN") throw { statusCode: 403, message: "Cannot modify super admin status" };
  user.isActive = isActive;
  await user.save();
  return { id: user.id, isActive: user.isActive };
}

module.exports = { listUsers, updateUserStatus };
