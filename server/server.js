require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, ensureConnection } = require('./config/db');

const eventRoutes = require('./routes/eventRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const recordingRoutes = require('./routes/recordingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares - CORS configured to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to ensure DB connection before requests (for serverless)
app.use(async (req, res, next) => {
  // Skip for health check
  if (req.path === '/api/health') {
    return next();
  }

  // Try to ensure DB connection if MONGO_URI is set
  if (process.env.MONGO_URI) {
    try {
      await ensureConnection(process.env.MONGO_URI);
    } catch (err) {
      console.log('⚠️ DB connection attempt failed, continuing...');
      // Don't block the request - let controllers handle fallback
    }
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
  const mongoStatus = process.env.MONGO_URI 
    ? (require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected')
    : 'not_configured';
  
  res.json({ 
    status: 'ok',
    mongo: mongoStatus,
    timestamp: new Date().toISOString()
  });
});

// Connect DB on startup (for non-serverless environments)
if (process.env.NODE_ENV !== 'production' && process.env.MONGO_URI) {
  connectDB(process.env.MONGO_URI).catch(err => {
    console.log('⚠️ MongoDB connection failed on startup, will retry on request');
  });
} else if (!process.env.MONGO_URI) {
  console.log('⚠️ MONGO_URI not set in environment variables');
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 MongoDB URI: ${process.env.MONGO_URI ? 'Set' : 'Not set'}`);
  });
}

// Export for Vercel
module.exports = app;
