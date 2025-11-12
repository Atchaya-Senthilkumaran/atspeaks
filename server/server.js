require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB, ensureConnection } = require('./config/db');

const eventRoutes = require('./routes/eventRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const recordingRoutes = require('./routes/recordingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Get MongoDB URI from environment variables
// Supports both MONGO_URI and MONGODB_URI for compatibility
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// Middlewares - CORS configured to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to ensure DB connection before requests (for Vercel serverless)
// This connects on each request but reuses cached connections
app.use(async (req, res, next) => {
  // Skip for health check to avoid connection overhead
  if (req.path === '/api/health' || req.path === '/') {
    return next();
  }

  // Only attempt connection if MONGO_URI is set
  if (MONGO_URI) {
    try {
      // Check current connection state
      const currentState = mongoose.connection.readyState;
      console.log(`📊 Current MongoDB readyState: ${currentState} (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)`);
      
      // If not connected, ensure connection is established
      if (currentState !== 1) {
        console.log('🔄 MongoDB not connected, attempting to establish connection...');
        const connection = await ensureConnection(MONGO_URI);
        
        // Wait for connection if it's in progress (state 2)
        if (mongoose.connection.readyState === 2) {
          console.log('⏳ Connection in progress, waiting...');
          let waitAttempts = 0;
          while (mongoose.connection.readyState === 2 && waitAttempts < 30) {
            await new Promise(resolve => setTimeout(resolve, 500));
            waitAttempts++;
          }
        }
        
        // Check final state
        if (mongoose.connection.readyState === 1) {
          console.log('✅ MongoDB connection established successfully');
        } else {
          console.log(`⚠️ MongoDB connection failed (readyState: ${mongoose.connection.readyState})`);
          // Don't block request - let controllers handle error gracefully
        }
      } else {
        console.log('✅ Using existing MongoDB connection');
      }
    } catch (err) {
      // Log error but don't block request - let controllers handle error response
      console.error('❌ DB connection attempt failed:', err.message);
      console.error('❌ Error stack:', err.stack);
    }
  } else {
    console.log('⚠️ MONGO_URI not set, skipping database connection');
  }
  
  next();
});

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/recordings', recordingRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  let mongoStatus = 'not_configured';
  
  if (MONGO_URI) {
    // Check connection state without attempting to connect
    const readyState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    mongoStatus = readyState === 1 ? 'connected' : 'disconnected';
    
    // Optionally try to establish connection for health check
    if (readyState !== 1) {
      try {
        await ensureConnection(MONGO_URI);
        mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      } catch (err) {
        mongoStatus = 'connection_failed';
      }
    }
  }
  
  res.json({ 
    status: 'ok',
    mongo: mongoStatus,
    readyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route (optional - for testing)
app.get('/', (req, res) => {
  res.json({
    message: 'AT Speaks API Server',
    status: 'running',
    mongo: MONGO_URI ? (mongoose.connection.readyState === 1 ? 'connected' : 'disconnected') : 'not_configured',
    timestamp: new Date().toISOString()
  });
});

// Initialize connection for local development (not needed for Vercel serverless)
if (process.env.NODE_ENV !== 'production') {
  // For local development, try to connect on startup
  if (MONGO_URI) {
    console.log('🔄 Attempting to connect to MongoDB on startup...');
    connectDB(MONGO_URI)
      .then(() => {
        console.log('✅ MongoDB connected on startup');
      })
      .catch(err => {
        console.log('⚠️ MongoDB connection failed on startup, will retry on request');
        console.log('⚠️ Error:', err.message);
      });
  } else {
    console.log('⚠️ MONGO_URI not set in environment variables');
    console.log('⚠️ Server will run without database connection');
  }
  
  // Start server for local development
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 MongoDB URI: ${MONGO_URI ? 'Set' : 'Not set'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Ready to handle requests`);
  });
}

// Export for Vercel serverless
// Vercel will call this module for each request
module.exports = app;
