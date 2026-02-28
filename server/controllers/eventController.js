const Event = require('../models/Event');
const mongoose = require('mongoose');

// GET /api/events
// Fetches events only from MongoDB database - no mock data fallback
exports.getEvents = async (req, res) => {
  try {
    console.log(`📊 MongoDB readyState: ${mongoose.connection.readyState}`);
    console.log(`📊 MONGO_URI set: ${process.env.MONGO_URI ? 'Yes' : 'No'}`);

    // Check if MONGO_URI is configured
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not configured');
      return res.status(503).json({
        error: 'Database not configured',
        message: 'MongoDB connection string is not set',
        events: []
      });
    }

    // Try to ensure connection - this will wait for connection if it's in progress (state 2)
    const { ensureConnection } = require('../config/db');
    console.log('🔄 Ensuring MongoDB connection...');
    
    let connection;
    try {
      connection = await ensureConnection(process.env.MONGO_URI);
      
      // If connection is in progress (state 2), wait for it to complete
      if (mongoose.connection.readyState === 2) {
        console.log('⏳ Connection in progress, waiting for it to complete...');
        let waitAttempts = 0;
        const maxWaitAttempts = 40; // Wait up to 20 seconds (40 * 500ms)
        
        while (mongoose.connection.readyState === 2 && waitAttempts < maxWaitAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
          waitAttempts++;
          
          if (waitAttempts % 5 === 0) {
            console.log(`⏳ Still connecting... (${waitAttempts}/${maxWaitAttempts})`);
          }
        }
      }
      
      // Wait a bit more for connection to stabilize
      if (mongoose.connection.readyState === 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } catch (connErr) {
      console.error('⚠️ Connection attempt failed:', connErr.message);
    }

    // Check if MongoDB is connected after waiting
    if (mongoose.connection.readyState !== 1) {
      console.error(`❌ MongoDB connection failed (readyState: ${mongoose.connection.readyState})`);
      console.error('❌ Connection states: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting');
      return res.status(503).json({
        error: 'Database connection failed',
        message: 'Unable to connect to MongoDB. Please check your database configuration.',
        readyState: mongoose.connection.readyState,
        events: []
      });
    }

    // MongoDB is connected, fetch events from database
    console.log('✅ MongoDB is connected, fetching events from database...');
    
    try {
      // Fetch events where isVisible is true (or field doesn't exist yet for backward compatibility)
      const events = await Event.find({ 
        $or: [
          { isVisible: true }, 
          { isVisible: { $exists: false } }
        ] 
      }).sort({ date: -1, createdAt: -1 })
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
