const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('⚠️  MongoDB connection error:', err.message);
    console.log('⚠️  Server will continue with mock data fallback');
    // Don't exit the process - let the API use mock data
  }
};

module.exports = connectDB;
