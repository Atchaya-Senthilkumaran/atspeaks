const RecordingRequest = require('../models/RecordingRequest');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserConfirmation } = require('../utils/emailService');
const mongoose = require('mongoose');

// POST - Create new recording request
exports.createRecordingRequest = async (req, res) => {
  try {
    console.log('📝 Recording request received');
    console.log('📝 Request method:', req.method);
    console.log('📝 Request URL:', req.url);
    console.log('📝 Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('📝 Content-Type:', req.get('Content-Type'));
    console.log('📝 Request body type:', typeof req.body);
    console.log('📝 Request body:', req.body);
    console.log('📝 Request body keys:', req.body ? Object.keys(req.body) : 'No body');
    console.log('📝 Request body stringified:', JSON.stringify(req.body, null, 2));

    // Check if request body exists and is valid
    if (!req.body || typeof req.body !== 'object') {
      console.error('❌ Request body is missing or invalid');
      console.error('❌ Request body type:', typeof req.body);
      console.error('❌ Request body:', req.body);
      console.error('❌ Content-Type:', req.get('Content-Type'));
      console.error('❌ Request method:', req.method);
      return res.status(400).json({
        success: false,
        message: 'Request body is missing or invalid. Please ensure the request is sent as JSON with all required fields.',
        error: 'Invalid request body'
      });
    }
    
    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      console.error('❌ Request body is empty object');
      console.error('❌ Content-Type:', req.get('Content-Type'));
      console.error('❌ Request headers:', req.headers);
      return res.status(400).json({
        success: false,
        message: 'Request body is empty. Please fill all required fields and try again.',
        error: 'Empty request body'
      });
    }
    
    // Log all received fields
    console.log('📦 Received request body fields:', Object.keys(req.body));
    console.log('📦 Request body values:', req.body);

    // Extract and validate fields from request body
    // Handle all possible input types (string, number, null, undefined, empty string, etc.)
    const getFieldValue = (fieldName) => {
      const rawValue = req.body[fieldName];
      
      // Log the raw value for debugging
      console.log(`  Raw ${fieldName}:`, rawValue === undefined ? 'undefined' : rawValue === null ? 'null' : `"${rawValue}"`, `(type: ${typeof rawValue})`);
      
      // Handle different input types
      if (rawValue === null || rawValue === undefined) {
        return null; // Use null to indicate field is missing (not just empty)
      }
      
      // Convert to string and trim
      const strValue = String(rawValue).trim();
      return strValue.length > 0 ? strValue : null; // Return null if empty after trim
    };

    // Extract all fields
    const name = getFieldValue('name');
    const email = getFieldValue('email');
    const whatsapp = getFieldValue('whatsapp');
    const institution = getFieldValue('institution');
    const location = getFieldValue('location');
    const yearOrRole = getFieldValue('yearOrRole');
    const heardFrom = getFieldValue('heardFrom') || 'website'; // Default value
    const eventId = getFieldValue('eventId') || '';
    const upiTransactionId = getFieldValue('upiTransactionId');

    // Build fields object - use empty string for missing fields
    const fields = {
      name: name || '',
      email: email || '',
      whatsapp: whatsapp || '',
      institution: institution || '',
      location: location || '',
      yearOrRole: yearOrRole || '',
      heardFrom: heardFrom || 'website',
      upiTransactionId: upiTransactionId || ''
    };

    console.log('📋 Field values after processing:');
    Object.entries(fields).forEach(([key, value]) => {
      console.log(`  ${key}: "${value}" (length: ${value.length}, type: ${typeof value}, isEmpty: ${!value})`);
    });

    // Check for missing required fields
    // Check both raw values and processed values to identify the issue
    const requiredFields = ['name', 'email', 'whatsapp', 'institution', 'location', 'yearOrRole', 'upiTransactionId'];
    const missingFields = [];
    
    console.log('🔍 Validating required fields:');
    requiredFields.forEach(field => {
      const rawValue = req.body[field];
      const processedValue = fields[field];
      
      // Check if field is missing or empty
      // A field is missing if:
      // 1. It's not in the request body (undefined)
      // 2. It's null in the request body
      // 3. It's an empty string after trimming
      const isMissing = rawValue === undefined || 
                        rawValue === null || 
                        (typeof rawValue === 'string' && rawValue.trim().length === 0) ||
                        processedValue === '' ||
                        processedValue.length === 0;
      
      if (isMissing) {
        missingFields.push(field);
        console.error(`❌ Field "${field}" is MISSING or EMPTY`);
        console.error(`   - Raw value in req.body: ${rawValue === undefined ? 'undefined' : rawValue === null ? 'null' : JSON.stringify(rawValue)}`);
        console.error(`   - Processed value: ${JSON.stringify(processedValue)}`);
        console.error(`   - Type: ${typeof rawValue}`);
        console.error(`   - Length: ${processedValue ? processedValue.length : 0}`);
      } else {
        console.log(`✅ Field "${field}" is VALID`);
        console.log(`   - Value: "${processedValue}" (length: ${processedValue.length})`);
      }
    });

    if (missingFields.length > 0) {
      console.error('❌ Missing or empty required fields:', missingFields.join(', '));
      console.error('❌ Missing field details:', missingFields.map(f => ({ 
        field: f, 
        value: fields[f], 
        rawValue: req.body[f],
        type: typeof fields[f],
        length: fields[f] ? fields[f].length : 0
      })));
      console.error('❌ All received fields:', Object.keys(req.body));
      console.error('❌ All received values:', req.body);
      
      // Return detailed error response with specific missing fields
      const errorMessage = missingFields.length === requiredFields.length
        ? 'All required fields are missing. Please fill all fields and try again.'
        : `Please fill all required fields: ${missingFields.join(', ')}`;
      
      const errorResponse = {
        success: false,
        message: errorMessage,
        error: 'Validation failed',
        missingFields: missingFields,
        receivedFields: Object.keys(req.body),
        requiredFields: requiredFields,
        debug: process.env.NODE_ENV !== 'production' ? {
          allFields: fields,
          missingFields: missingFields.map(f => ({
            field: f,
            received: req.body[f],
            processed: fields[f],
            type: typeof req.body[f],
            isEmpty: !fields[f] || fields[f].length === 0
          })),
          requestBody: req.body,
          requestBodyKeys: Object.keys(req.body),
          requestBodyLength: Object.keys(req.body).length
        } : undefined
      };
      
      console.error('❌ Validation failed - returning error response');
      console.error('❌ Error response:', JSON.stringify(errorResponse, null, 2));
      
      return res.status(400).json(errorResponse);
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
    // IMPORTANT: We already validated all fields, so they should be present
    if (mongoose.connection.readyState === 1) {
      try {
        // Verify booking data before creating model instance
        console.log('📦 Verifying booking data before save:', JSON.stringify(bookingData, null, 2));
        
        // Double-check all required fields are present and non-empty
        const requiredForSave = ['name', 'email', 'whatsapp', 'institution', 'location', 'yearOrRole', 'heardFrom', 'upiTransactionId'];
        const missingForSave = requiredForSave.filter(field => {
          const value = bookingData[field];
          return !value || (typeof value === 'string' && value.trim().length === 0);
        });
        
        if (missingForSave.length > 0) {
          console.error('❌ CRITICAL: Required fields missing before save:', missingForSave);
          console.error('❌ Booking data:', bookingData);
          throw new Error(`Required fields missing before save: ${missingForSave.join(', ')}`);
        }
        
        // Create and save booking
        const booking = new RecordingRequest(bookingData);
        
        // Validate the document before saving
        const validationError = booking.validateSync();
        if (validationError) {
          console.error('❌ Mongoose validation error:', validationError);
          console.error('❌ Validation errors:', validationError.errors);
          throw validationError;
        }
        
        // Save to database
        await booking.save({ timeout: 10000 }); // 10 second timeout
        savedToDb = true;
        console.log('✅ Booking saved to MongoDB successfully');
      } catch (dbErr) {
        console.error('⚠️ MongoDB save failed (will continue with email):', dbErr.message);
        console.error('⚠️ Error name:', dbErr.name);
        console.error('⚠️ Error details:', dbErr);
        
        // If it's a validation error, log it but don't fail the request
        // Emails will still be sent
        if (dbErr.name === 'ValidationError') {
          console.error('⚠️ Mongoose validation failed, but continuing with email');
          console.error('⚠️ Validation errors:', dbErr.errors);
        }
        // Don't fail the request if MongoDB fails - emails will still be sent
      }
    } else {
      console.log('⚠️ MongoDB not connected, proceeding with email only');
      console.log('⚠️ Please check MongoDB configuration in Vercel environment variables');
    }

    // Send emails (non-blocking)
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

    sendAdminNotification(emailData, eventDetails).catch(err =>
      console.error('❌ Admin email failed:', err.message)
    );
    sendUserConfirmation(emailData, eventDetails).catch(err =>
      console.error('❌ User email failed:', err.message)
    );

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
    console.error('❌ Error name:', err.name);
    console.error('❌ Error message:', err.message);
    console.error('❌ Stack trace:', err.stack);
    console.error('❌ Request body at error:', req.body);
    console.error('❌ Request headers:', req.headers);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + err.message,
        error: err.message,
        details: err.errors
      });
    }
    
    if (err.name === 'MongoError' || err.name === 'MongoServerError') {
      return res.status(500).json({
        success: false,
        message: 'Database error occurred. Please try again.',
        error: process.env.NODE_ENV === 'production' ? 'Database error' : err.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to process booking. Please try again.',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      debug: process.env.NODE_ENV !== 'production' ? {
        name: err.name,
        message: err.message,
        stack: err.stack
      } : undefined
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
