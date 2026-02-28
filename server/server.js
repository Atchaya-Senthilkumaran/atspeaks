require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB, ensureConnection } = require('./config/db');
// Portfolio Launchpad event deployment - 2025-11-26

const eventRoutes = require('./routes/eventRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const recordingRoutes = require('./routes/recordingRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

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
        
        // Use Promise.resolve to handle both success and failure gracefully
        const connection = await Promise.resolve(ensureConnection(MONGO_URI)).catch(err => {
          console.error('⚠️ Connection attempt error:', err?.message || err);
          return null;
        });
        
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
      // This catch should never be hit if we use Promise.resolve, but keep it for safety
      console.error('❌ DB connection attempt failed:', err?.message || 'Unknown error');
      if (err?.stack) {
        console.error('❌ Error stack:', err.stack.split('\n').slice(0, 3).join('\n'));
      }
    }
  } else {
    console.log('⚠️ MONGO_URI not set, skipping database connection');
  }
  
  // Always call next() - never block the request
  next();
});

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/recordings', recordingRoutes);
app.use('/api/registrations', registrationRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    let mongoStatus = 'not_configured';
    
    if (MONGO_URI) {
      // Check connection state without attempting to connect
      const readyState = mongoose.connection.readyState;
      // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      mongoStatus = readyState === 1 ? 'connected' : 'disconnected';
      
      // Optionally try to establish connection for health check
      if (readyState !== 1) {
        try {
          await Promise.resolve(ensureConnection(MONGO_URI)).catch(() => null);
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
  } catch (err) {
    // Always return a response, even if there's an error
    res.status(200).json({
      status: 'error',
      mongo: 'error',
      readyState: mongoose.connection.readyState,
      error: err?.message || 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Root route (optional - for testing)
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'AT Speaks API Server',
      status: 'running',
      mongo: MONGO_URI ? (mongoose.connection.readyState === 1 ? 'connected' : 'disconnected') : 'not_configured',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(200).json({
      message: 'AT Speaks API Server',
      status: 'running',
      mongo: 'error',
      error: err?.message || 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Catch-all route handler for 404s (must be after all routes, before error handler)
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler to catch any unhandled errors (MUST be last, after all routes and 404 handler)
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error in middleware:', err);
  console.error('❌ Error message:', err?.message || 'Unknown error');
  if (err?.stack) {
    console.error('❌ Error stack:', err.stack.split('\n').slice(0, 5).join('\n'));
  }
  
  // Always send a response to prevent function crash
  if (!res.headersSent) {
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'production' ? 'An error occurred' : (err?.message || 'Unknown error'),
      timestamp: new Date().toISOString()
    });
  }
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
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 MongoDB URI: ${MONGO_URI ? 'Set' : 'Not set'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Ready to handle requests`);

    // Log the number of events in the database
    if (mongoose.connection.readyState === 1) {
      const Event = require('./models/Event');
      try {
        const eventCount = await Event.countDocuments();
        console.log(`📊 Total events in database: ${eventCount}`);
      } catch (countErr) {
        console.log('⚠️ Failed to count events:', countErr.message);
      }
    } else {
      console.log('⚠️ Cannot count events: MongoDB not connected on startup.');
    }
  });
}

// Handle unhandled promise rejections (prevents function crash)
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise);
  console.error('❌ Reason:', reason);
  // Don't exit - let the request complete
});

// Handle uncaught exceptions (prevents function crash)
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  console.error('❌ Stack:', err.stack);
  // Don't exit - let the request complete
});

// Export for Vercel serverless
// Vercel will call this module for each request
module.exports = app;
