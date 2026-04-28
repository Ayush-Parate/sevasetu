const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ayushparate1712:%40Ayush1712@ayushapi.phtqlsw.mongodb.net/sevasetu?retryWrites=true&w=majority&appName=AyushApi";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000
  });
  return mongoose.connection;
}

async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = { mongoose, connectToDatabase, disconnectFromDatabase, MONGODB_URI };
