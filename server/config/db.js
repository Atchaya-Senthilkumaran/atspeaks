const mongoose = require('mongoose');

/**
 * Serverless-compatible MongoDB connection handler
 * Uses global.mongoose cache to reuse connections across serverless invocations
 * This is crucial for Vercel serverless functions where connections should be cached
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with caching for serverless environments
 * @param {string} mongoUri - MongoDB connection URI
 * @returns {Promise<mongoose.Mongoose|null>} - Mongoose connection or null if failed
 */
const connectDB = async (mongoUri) => {
  // If no URI provided, return null
  if (!mongoUri) {
    console.log('⚠️  MONGO_URI not provided');
    return null;
  }

  // Return existing cached connection if ready
  // This is important for serverless - reuses connection from previous invocation
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  // If connection is already in progress (another request is connecting), wait for it
  // This prevents multiple simultaneous connection attempts
  if (!cached.promise) {
    console.log('🔌 Establishing new MongoDB connection...');
    
    const opts = {
      bufferCommands: false, // Disable mongoose buffering for faster error detection
      maxPoolSize: 5, // Reduced pool size for serverless (fewer connections needed)
      minPoolSize: 1, // Minimum pool size
      serverSelectionTimeoutMS: 15000, // 15s timeout to select server
      socketTimeoutMS: 45000, // 45s timeout for socket operations
      connectTimeoutMS: 15000, // 15s timeout to establish connection
      retryWrites: true, // Retry writes on transient errors
      retryReads: true, // Retry reads on transient errors
    };

    // Only add serverApi for MongoDB Atlas (mongodb+srv://)
    // This is optional and only needed for MongoDB Atlas
    if (mongoUri && mongoUri.startsWith('mongodb+srv://')) {
      opts.serverApi = {
        version: '1', // Use stable API version
        strict: false, // Allow flexible schema
        deprecationErrors: false, // Don't throw on deprecated features
      };
    }

    // Create connection promise
    cached.promise = mongoose.connect(mongoUri, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB connected successfully`);
        console.log(`📊 Host: ${mongooseInstance.connection.host}`);
        console.log(`📊 Database: ${mongooseInstance.connection.name}`);
        console.log(`📊 Ready State: ${mongooseInstance.connection.readyState}`);
        
        // Cache the connection
        cached.conn = mongooseInstance;
        
        // Set up connection event handlers
        mongooseInstance.connection.on('error', (err) => {
          console.error('❌ MongoDB connection error:', err.message);
          // Reset cache on error
          cached.promise = null;
          cached.conn = null;
        });

        mongooseInstance.connection.on('disconnected', () => {
          console.log('⚠️  MongoDB disconnected');
          // Reset cache on disconnect
          cached.promise = null;
          cached.conn = null;
        });

        return mongooseInstance;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('❌ Error name:', err.name);
        if (err.stack) {
          console.error('❌ Error stack:', err.stack.split('\n').slice(0, 5).join('\n'));
        }
        
        // Reset promise on error so we can retry
        cached.promise = null;
        cached.conn = null;
        
        // Return null instead of throwing - let caller handle
        return null;
      });
  }

  // Wait for connection promise (either existing or newly created)
  try {
    const conn = await cached.promise;
    
    // Verify connection is actually ready
    if (conn && mongoose.connection.readyState === 1) {
      cached.conn = conn;
      return conn;
    }
    
    // Connection failed or not ready, reset cache
    console.log('⚠️  Connection promise resolved but connection not ready');
    cached.promise = null;
    cached.conn = null;
    return null;
  } catch (e) {
    // This shouldn't happen since we catch errors in the promise
    // But handle it just in case
    console.error('⚠️  Unexpected error awaiting connection:', e.message);
    cached.promise = null;
    cached.conn = null;
    return null;
  }
};

/**
 * Ensure MongoDB connection is established before operations
 * This is called on each request in serverless environments
 * Uses cached connection if available, otherwise establishes new connection
 * @param {string} mongoUri - MongoDB connection URI
 * @returns {Promise<mongoose.Connection|null>} - Mongoose connection or null if failed
 */
const ensureConnection = async (mongoUri) => {
  // If already connected and ready, return immediately
  // This is the fast path for serverless - most requests after the first will hit this
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Try to establish connection
  const connection = await connectDB(mongoUri);
  
  // If connection succeeded, return it
  if (connection && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  
  // If connection failed, try once more after a short delay
  // This handles transient network issues in serverless environments
  if (!connection && mongoose.connection.readyState !== 1) {
    console.log('🔄 Retrying MongoDB connection after delay...');
    
    // Reset cache completely
    cached.promise = null;
    cached.conn = null;
    
    // Wait a bit before retry (allows network to stabilize)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retry connection
    const retryConnection = await connectDB(mongoUri);
    
    if (retryConnection && mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }
  }
  
  // If still not connected, return null or current connection state
  // Controllers will handle fallback to mock data
  return mongoose.connection.readyState === 1 ? mongoose.connection : null;
};

module.exports = { connectDB, ensureConnection };
