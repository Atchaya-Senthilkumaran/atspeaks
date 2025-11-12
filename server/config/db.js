const mongoose = require('mongoose');

// Cache connection for serverless (Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async (mongoUri) => {
  // If no URI provided, return null
  if (!mongoUri) {
    console.log('⚠️  MONGO_URI not provided');
    return null;
  }

  // Return existing connection if ready
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 5, // Reduced for serverless
      serverSelectionTimeoutMS: 15000, // 15s to establish connection
      socketTimeoutMS: 45000, // 45s for socket operations
      connectTimeoutMS: 15000, // 15s connection timeout
      retryWrites: true,
      // Add retry logic for serverless
      retryReads: true,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
      console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
      console.log(`📊 Connection state: ${mongoose.connection.readyState}`);
      cached.conn = mongoose;
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.error('❌ Error stack:', err.stack);
      cached.promise = null; // Reset promise on error
      cached.conn = null;
      return null;
    });
  }

  try {
    const conn = await cached.promise;
    if (conn && mongoose.connection.readyState === 1) {
      cached.conn = conn;
      return conn;
    }
    // Connection failed, reset and return null
    cached.promise = null;
    cached.conn = null;
    return null;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error('⚠️  MongoDB connection failed:', e.message);
    return null;
  }
};

// Helper to ensure connection before operations
const ensureConnection = async (mongoUri) => {
  // If already connected, return connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Try to connect
  const connection = await connectDB(mongoUri);
  
  // If connection failed and we're still not connected, try once more
  if (!connection && mongoose.connection.readyState !== 1) {
    console.log('🔄 Retrying MongoDB connection...');
    // Reset cache and try again
    cached.promise = null;
    cached.conn = null;
    // Wait a bit before retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    return await connectDB(mongoUri);
  }
  
  return connection || (mongoose.connection.readyState === 1 ? mongoose.connection : null);
};

module.exports = { connectDB, ensureConnection };
