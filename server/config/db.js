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
    // Optimized timeout options for Vercel serverless
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10s to establish connection
      socketTimeoutMS: 45000, // 45s for socket operations
      maxPoolSize: 10, // Limit connection pool
      minPoolSize: 1,
      maxIdleTimeMS: 30000, // Close idle connections after 30s
      connectTimeoutMS: 10000, // 10s connection timeout
      bufferCommands: false, // Disable buffering for faster error detection
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
