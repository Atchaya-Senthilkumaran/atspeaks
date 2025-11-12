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
      // IMPORTANT: Enable buffering but with longer timeout
      // This allows Mongoose to wait for connection before executing queries
      bufferCommands: true, // Enable buffering - wait for connection before executing queries
      bufferMaxEntries: 0, // Disable limit on buffered commands (0 = unlimited)
      // Connection pool settings
      maxPoolSize: 5, // Reduced pool size for serverless (fewer connections needed)
      minPoolSize: 1, // Minimum pool size
      // Timeout settings (increased for serverless cold starts)
      serverSelectionTimeoutMS: 30000, // 30s timeout to select server (increased for serverless)
      socketTimeoutMS: 45000, // 45s timeout for socket operations
      connectTimeoutMS: 30000, // 30s timeout to establish connection (increased for serverless)
      // Retry settings
      retryWrites: true, // Retry writes on transient errors
      retryReads: true, // Retry reads on transient errors
      // Wait for connection to be ready before executing queries
      // This prevents "buffering timed out" errors
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
    // mongoose.connect() returns a promise that resolves when connected
    cached.promise = mongoose.connect(mongoUri, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB connected successfully`);
        console.log(`📊 Host: ${mongooseInstance.connection.host}`);
        console.log(`📊 Database: ${mongooseInstance.connection.name}`);
        console.log(`📊 Ready State: ${mongooseInstance.connection.readyState}`);
        
        // Cache the connection
        cached.conn = mongooseInstance;
        
        // Set up connection event handlers for monitoring
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
        throw err; // Re-throw to be caught by caller
      });
  }

  // Wait for connection promise (either existing or newly created)
  // mongoose.connect() promise resolves when connection is ready
  try {
    // Add a timeout to prevent hanging forever
    const conn = await Promise.race([
      cached.promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 30s')), 30000)
      )
    ]);
    
    // Connection promise resolved, connection should be ready
    // Verify connection is actually ready
    if (conn && mongoose.connection.readyState === 1) {
      cached.conn = conn;
      console.log('✅ Connection verified and ready');
      return conn;
    } else {
      // Connection exists but state is not ready - wait a bit
      console.log(`⚠️  Connection resolved but state is ${mongoose.connection.readyState}, waiting...`);
      let attempts = 0;
      while (mongoose.connection.readyState !== 1 && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 250));
        attempts++;
      }
      if (mongoose.connection.readyState === 1) {
        cached.conn = conn;
        console.log('✅ Connection ready after wait');
        return conn;
      }
    }
    
    // Connection failed or not ready after waiting
    console.log('⚠️  Connection promise resolved but connection not ready');
    console.log(`⚠️  Ready state: ${mongoose.connection.readyState}`);
    cached.promise = null;
    cached.conn = null;
    return null;
  } catch (e) {
    // Connection failed or timed out
    console.error('⚠️  Error awaiting connection:', e.message);
    if (e.message !== 'Connection timeout after 30s') {
      console.error('⚠️  Error details:', e);
    }
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
  // If already connected and ready, return immediately (fast path)
  // This is the fast path for serverless - most requests after the first will hit this
  if (mongoose.connection.readyState === 1) {
    console.log('✅ Using existing MongoDB connection');
    return mongoose.connection;
  }

  // If connection is in progress (state 2), wait for it
  if (mongoose.connection.readyState === 2) {
    console.log('⏳ Connection in progress, waiting for it to complete...');
    let waitAttempts = 0;
    const maxWaitAttempts = 40; // Wait up to 20 seconds
    
    while (mongoose.connection.readyState === 2 && waitAttempts < maxWaitAttempts) {
      await new Promise(resolve => setTimeout(resolve, 500));
      waitAttempts++;
      
      if (waitAttempts % 5 === 0) {
        console.log(`⏳ Still connecting... (${waitAttempts}/${maxWaitAttempts})`);
      }
    }
    
    if (mongoose.connection.readyState === 1) {
      console.log('✅ Connection completed successfully');
      return mongoose.connection;
    }
  }

  // Try to establish connection
  console.log('🔄 Establishing new MongoDB connection...');
  const connection = await connectDB(mongoUri);
  
  // Wait for connection to be ready (connectDB should handle this, but double-check)
  if (connection) {
    // Wait for connection to be fully ready
    let readyAttempts = 0;
    const maxReadyAttempts = 30; // Wait up to 15 seconds
    
    while (mongoose.connection.readyState !== 1 && readyAttempts < maxReadyAttempts) {
      await new Promise(resolve => setTimeout(resolve, 500));
      readyAttempts++;
      
      if (readyAttempts % 5 === 0) {
        console.log(`⏳ Waiting for connection to be ready... (${readyAttempts}/${maxReadyAttempts}, state: ${mongoose.connection.readyState})`);
      }
    }
    
    if (mongoose.connection.readyState === 1) {
      console.log('✅ Connection ready for operations');
      return mongoose.connection;
    }
  }
  
  // If connection failed, try once more after a short delay
  // This handles transient network issues in serverless environments
  if (!connection || mongoose.connection.readyState !== 1) {
    console.log('🔄 Retrying MongoDB connection after delay...');
    
    // Reset cache completely
    cached.promise = null;
    cached.conn = null;
    
    // Close any existing connection (don't wait for it)
    if (mongoose.connection.readyState !== 0 && mongoose.connection.readyState !== 3) {
      try {
        await mongoose.connection.close();
      } catch (closeErr) {
        // Ignore errors when closing
      }
    }
    
    // Wait a bit before retry (allows network to stabilize)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Retry connection
    console.log('🔄 Attempting connection retry...');
    const retryConnection = await connectDB(mongoUri);
    
    if (retryConnection) {
      // Wait for retry connection to be ready
      let readyAttempts = 0;
      const maxReadyAttempts = 30;
      
      while (mongoose.connection.readyState !== 1 && readyAttempts < maxReadyAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500));
        readyAttempts++;
      }
      
      if (mongoose.connection.readyState === 1) {
        console.log('✅ Connection ready after retry');
        return mongoose.connection;
      } else {
        console.error(`⚠️  Connection not ready after retry (state: ${mongoose.connection.readyState})`);
      }
    } else {
      console.error('⚠️  Retry connection attempt returned null');
    }
  }
  
  // If still not connected, return null
  // Controllers will handle error responses
  console.error(`❌ Failed to establish MongoDB connection (final state: ${mongoose.connection.readyState})`);
  return null;
};

module.exports = { connectDB, ensureConnection };
