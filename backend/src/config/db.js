const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MongoDB URI not found. Skipping DB connection for now.");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn("⚠️ Warning: Continuing without MongoDB. Features requiring database access will fail, but AI APIs will remain active.");
    // Removed process.exit(1) to allow hackathon demo to continue running even if DB credentials are wrong.
  }
};

module.exports = connectDB;
