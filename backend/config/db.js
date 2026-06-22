const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/innovision');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`WARNING: Error connecting to MongoDB (${error.message}). Running server without database connection.`);
  }
};

module.exports = connectDB;
