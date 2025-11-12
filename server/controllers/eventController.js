const Event = require('../models/Event');
const mongoose = require('mongoose');

// GET /api/events
// Fetches events only from MongoDB database - no mock data fallback
exports.getEvents = async (req, res) => {
  try {
    console.log(`📊 MongoDB readyState: ${mongoose.connection.readyState}`);
    console.log(`📊 MONGO_URI set: ${process.env.MONGO_URI ? 'Yes' : 'No'}`);

    // Try to ensure connection if MONGO_URI is set
    if (process.env.MONGO_URI && mongoose.connection.readyState !== 1) {
      const { ensureConnection } = require('../config/db');
      console.log('🔄 Attempting to establish MongoDB connection...');
      try {
        await ensureConnection(process.env.MONGO_URI);
        // Wait a bit for connection to stabilize
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (connErr) {
        console.error('⚠️ Connection attempt failed:', connErr.message);
      }
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI not configured');
        return res.status(503).json({
          error: 'Database not configured',
          message: 'MongoDB connection string is not set',
          events: []
        });
      } else {
        console.error('❌ MongoDB connection failed');
        return res.status(503).json({
          error: 'Database connection failed',
          message: 'Unable to connect to MongoDB. Please check your database configuration.',
          events: []
        });
      }
    }

    // MongoDB is connected, fetch events from database
    console.log('✅ MongoDB is connected, fetching events from database...');
    
    try {
      const events = await Event.find().sort({ date: -1, createdAt: -1 })
        .maxTimeMS(10000) // 10 second timeout
        .lean(); // Use lean for better performance
      
      console.log(`📊 Events from database: ${events.length}`);

      // Return events from database (empty array if no events)
      console.log(`✅ Returning ${events.length} events from database`);
      return res.json(events);
      
    } catch (dbErr) {
      console.error('❌ Database query error:', dbErr.message);
      console.error('❌ Error name:', dbErr.name);
      
      // Return error response instead of mock data
      return res.status(503).json({
        error: 'Database query failed',
        message: 'Unable to fetch events from database',
        events: []
      });
    }
  } catch (err) {
    console.error('❌ Error in getEvents:', err);
    console.error('Stack trace:', err.stack);
    
    // Return error response instead of mock data
    return res.status(500).json({
      error: 'Failed to fetch events',
      message: err.message || 'Internal server error',
      events: []
    });
  }
};

// POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const ev = new Event(req.body);
    const saved = await ev.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};
