const mongoose = require('mongoose');

// Cache connection for serverless
let cachedConnection = null;

const connectDB = async (mongoUri) => {
  // Return cached connection if exists
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    // Set timeout options for Vercel
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    cachedConnection = conn;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('⚠️  MongoDB connection error:', err.message);
    console.log('⚠️  Server will continue with mock data fallback');
    // Don't exit the process - let the API use mock data
    return null;
  }
};

module.exports = connectDB;
