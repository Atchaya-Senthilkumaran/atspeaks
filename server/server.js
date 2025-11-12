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
      // Ensure connection is established (uses cached connection if available)
      // This waits for connection to be fully ready before proceeding
      const connection = await ensureConnection(MONGO_URI);
      
      if (!connection || mongoose.connection.readyState !== 1) {
        console.log('⚠️ MongoDB connection not ready, controllers will handle fallback');
        // Don't block request - let controllers handle fallback gracefully
      } else {
        console.log('✅ MongoDB connection ready for request');
      }
    } catch (err) {
      // Log error but don't block request - let controllers handle fallback
      console.log('⚠️ DB connection attempt failed, continuing with fallback...');
      console.log('⚠️ Error:', err.message);
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
    connectDB(MONGO_URI).catch(err => {
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
