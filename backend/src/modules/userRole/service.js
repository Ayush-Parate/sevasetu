const { User } = require("./models");

async function listUsers() {
  return User.findAll({ attributes: { exclude: ["passwordHash"] } });
}

module.exports = { listUsers };
