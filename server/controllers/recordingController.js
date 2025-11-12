const RecordingRequest = require('../models/RecordingRequest');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserConfirmation } = require('../utils/emailService');
const mongoose = require('mongoose');

// POST - Create new recording request
exports.createRecordingRequest = async (req, res) => {
  try {
    console.log('📝 Recording request received');
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Content-Type:', req.get('Content-Type'));

    // Extract and trim fields
    const name = req.body?.name;
    const email = req.body?.email;
    const whatsapp = req.body?.whatsapp;
    const institution = req.body?.institution;
    const location = req.body?.location;
    const yearOrRole = req.body?.yearOrRole;
    const heardFrom = req.body?.heardFrom || 'website'; // Default value
    const eventId = req.body?.eventId || '';
    const upiTransactionId = req.body?.upiTransactionId;

    // Validate fields - be more lenient with whitespace and empty strings
    const fields = {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      whatsapp: String(whatsapp || '').trim(),
      institution: String(institution || '').trim(),
      location: String(location || '').trim(),
      yearOrRole: String(yearOrRole || '').trim(),
      heardFrom: String(heardFrom || 'website').trim() || 'website',
      upiTransactionId: String(upiTransactionId || '').trim()
    };

    console.log('📋 Field values after trimming:');
    Object.entries(fields).forEach(([key, value]) => {
      console.log(`  ${key}: "${value}" (length: ${value.length}, isEmpty: ${!value})`);
    });

    // Check for missing required fields
    const requiredFields = ['name', 'email', 'whatsapp', 'institution', 'location', 'yearOrRole', 'upiTransactionId'];
    const missingFields = requiredFields.filter(field => !fields[field] || fields[field].length === 0);

    if (missingFields.length > 0) {
      console.error('❌ Missing or empty required fields:', missingFields.join(', '));
      console.error('❌ Field details:', missingFields.map(f => ({ field: f, value: fields[f], type: typeof fields[f] })));
      return res.status(400).json({
        success: false,
        message: `Please fill all required fields: ${missingFields.join(', ')}`,
        missingFields,
        receivedFields: Object.keys(req.body)
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email)) {
      console.error('❌ Invalid email format:', fields.email);
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
        field: 'email'
      });
    }

    console.log('✅ All fields validated successfully');

    // Fetch event details
    let eventDetails = { title: 'Event Recording', date: new Date().toLocaleDateString() };
    if (eventId && mongoose.connection.readyState === 1) {
      try {
        // Try to find event by ID (MongoDB ObjectId or string)
        if (eventId && eventId !== 'N/A' && eventId.trim()) {
          const event = await Event.findById(eventId).lean().maxTimeMS(5000);
          if (event) {
            eventDetails = { title: event.title, date: event.date || 'N/A' };
            console.log('✅ Event found:', eventDetails.title);
          } else {
            // Try to find by string ID if ObjectId lookup fails
            const events = await Event.find({ _id: eventId }).lean().maxTimeMS(5000);
            if (events.length > 0) {
              eventDetails = { title: events[0].title, date: events[0].date || 'N/A' };
            }
          }
        }
      } catch (err) {
        console.log('⚠️ Event lookup failed, using default:', err.message);
      }
    }

    // Prepare booking data with validated and trimmed values
    const bookingData = {
      name: fields.name,
      email: fields.email,
      whatsapp: fields.whatsapp,
      institution: fields.institution,
      location: fields.location,
      yearOrRole: fields.yearOrRole,
      heardFrom: fields.heardFrom,
      eventId: eventId || 'N/A',
      upiTransactionId: fields.upiTransactionId,
    };

    console.log('📦 Booking data prepared:', JSON.stringify(bookingData, null, 2));

    // Save to MongoDB (with timeout handling)
    console.log('💾 Attempting to save to MongoDB...');
    console.log('📊 MongoDB readyState:', mongoose.connection.readyState);
    let savedToDb = false;

    // Try to ensure connection if MONGO_URI is set
    if (process.env.MONGO_URI && mongoose.connection.readyState !== 1) {
      const { ensureConnection } = require('../config/db');
      console.log('🔄 Attempting to establish MongoDB connection...');
      try {
        await ensureConnection(process.env.MONGO_URI);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for connection to stabilize
      } catch (connErr) {
        console.error('⚠️ Connection attempt failed:', connErr.message);
      }
    }

    // Try to save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const booking = new RecordingRequest(bookingData);
        await booking.save({ timeout: 10000 }); // 10 second timeout
        savedToDb = true;
        console.log('✅ Booking saved to MongoDB successfully');
      } catch (dbErr) {
        console.error('⚠️ MongoDB save failed (will continue with email):', dbErr.message);
        console.error('⚠️ Error details:', dbErr);
        // Don't fail the request if MongoDB fails - emails will still be sent
      }
    } else {
      console.log('⚠️ MongoDB not connected, proceeding with email only');
      console.log('⚠️ Please check MongoDB configuration in Vercel environment variables');
    }

    // Send emails (await to ensure they're sent in serverless environment)
    console.log('📧 Sending emails...');
    const emailData = {
      name: fields.name,
      email: fields.email,
      whatsapp: fields.whatsapp,
      institution: fields.institution,
      location: fields.location,
      yearOrRole: fields.yearOrRole,
      heardFrom: fields.heardFrom,
      upiTransactionId: fields.upiTransactionId
    };

    // Send both emails in parallel but await them to ensure they complete
    // This is crucial in serverless environments where the function might terminate early
    // Promise.allSettled ensures both emails are attempted even if one fails
    const emailResults = await Promise.allSettled([
      sendAdminNotification(emailData, eventDetails),
      sendUserConfirmation(emailData, eventDetails)
    ]);
    
    // Check results and log status
    const adminResult = emailResults[0];
    const userResult = emailResults[1];
    
    if (adminResult.status === 'fulfilled') {
      console.log('✅ Admin notification email sent successfully');
    } else {
      console.error('❌ Admin email failed:', adminResult.reason?.message || adminResult.reason);
    }
    
    if (userResult.status === 'fulfilled') {
      console.log('✅ User confirmation email sent successfully');
    } else {
      console.error('❌ User email failed:', userResult.reason?.message || userResult.reason);
    }
    
    // Log overall status
    if (adminResult.status === 'fulfilled' && userResult.status === 'fulfilled') {
      console.log('✅ All emails sent successfully');
    } else {
      console.warn('⚠️ Some emails failed to send, but booking was successful');
    }

    console.log('✅ Recording booking completed successfully');

    // Send success response
    res.json({
      success: true,
      message: 'Booking successful!',
      eventTitle: eventDetails.title,
      note: "You'll receive recordings via registered email within 24–72 hours. A confirmation email has been sent to your inbox.",
    });

  } catch (err) {
    console.error('❌ Error in createRecordingRequest:', err);
    console.error('Stack trace:', err.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to process booking. Please try again.',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
  }
};

// GET - Fetch all recording requests (for admin)
exports.getRecordingRequests = async (req, res) => {
  try {
    // Ensure MongoDB connection is established before querying
    if (process.env.MONGO_URI && mongoose.connection.readyState !== 1) {
      const { ensureConnection } = require('../config/db');
      console.log('🔄 Ensuring MongoDB connection before query...');
      try {
        await ensureConnection(process.env.MONGO_URI);
        // Wait a bit for connection to stabilize
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (connErr) {
        console.error('⚠️ Connection attempt failed:', connErr.message);
      }
    }

    // Check if MongoDB is connected and ready
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB not connected for GET request');
      return res.status(200).json({
        success: true,
        message: 'Database not connected',
        data: []
      });
    }

    // Verify connection is actually working before querying
    try {
      // Quick check to ensure connection is active
      await mongoose.connection.db.admin().ping().catch(() => {
        throw new Error('Connection ping failed');
      });
    } catch (pingErr) {
      console.error('⚠️ Connection ping failed:', pingErr.message);
      return res.status(200).json({
        success: true,
        message: 'Database connection not ready',
        data: []
      });
    }

    console.log('✅ Connection verified, executing query...');

    // Execute query with timeout
    const requests = await RecordingRequest.find()
      .sort({ createdAt: -1 })
      .maxTimeMS(10000) // 10 second timeout for the query (increased)
      .lean() // Use lean() for better performance
      .exec(); // Explicitly execute the query

    console.log(`✅ Retrieved ${requests.length} recording requests`);

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error('❌ Error fetching recording requests:', err.message);
    console.error('❌ Error name:', err.name);
    console.error('❌ Error stack:', err.stack);

    // Handle timeout specifically
    if (err.name === 'MongooseError' && (err.message.includes('buffering timed out') || err.message.includes('timeout'))) {
      console.error('⚠️ Query timed out - connection may not be ready');
      return res.status(200).json({
        success: true,
        message: 'Database query timed out, please try again',
        data: []
      });
    }

    // Handle connection errors
    if (err.name === 'MongoError' || err.name === 'MongoServerError' || err.message.includes('connection')) {
      console.error('⚠️ Connection error occurred');
      return res.status(200).json({
        success: true,
        message: 'Database connection error, please try again',
        data: []
      });
    }

    // Return empty array instead of error if DB not available
    res.status(200).json({
      success: true,
      message: 'Unable to fetch requests at this time',
      data: []
    });
  }
};
