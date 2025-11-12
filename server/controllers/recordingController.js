const RecordingRequest = require('../models/RecordingRequest');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserConfirmation } = require('../utils/emailService');
const mongoose = require('mongoose');

// POST - Create new recording request
exports.createRecordingRequest = async (req, res) => {
  try {
    console.log('📝 Recording request received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { name, email, whatsapp, institution, location, yearOrRole, heardFrom, eventId, upiTransactionId } = req.body;

    // Validate fields with detailed logging
    const missingFields = [];
    const fieldValues = {
      name: name || '',
      email: email || '',
      whatsapp: whatsapp || '',
      institution: institution || '',
      location: location || '',
      yearOrRole: yearOrRole || '',
      heardFrom: heardFrom || '',
      upiTransactionId: upiTransactionId || ''
    };

    console.log('📋 Field values received:');
    Object.entries(fieldValues).forEach(([key, value]) => {
      const trimmed = String(value).trim();
      console.log(`  ${key}: "${trimmed}" (length: ${trimmed.length})`);
      if (!trimmed) {
        missingFields.push(key);
      }
    });

    if (missingFields.length > 0) {
      console.error('❌ Missing or empty fields:', missingFields.join(', '));
      return res.status(400).json({
        success: false,
        message: `Please fill all required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    console.log('✅ All fields validated successfully');

    // Fetch event details
    let eventDetails = { title: 'Event Recording', date: new Date().toLocaleDateString() };
    if (eventId && mongoose.connection.readyState === 1) {
      try {
        if (eventId.match(/^[0-9a-fA-F]{24}$/)) {
          const event = await Event.findById(eventId);
          if (event) {
            eventDetails = { title: event.title, date: event.date || 'N/A' };
          }
        }
      } catch (err) {
        console.log('⚠️ Event lookup failed, using default');
      }
    }

    // Prepare booking data with trimmed values
    const bookingData = {
      name: String(name).trim(),
      email: String(email).trim(),
      whatsapp: String(whatsapp).trim(),
      institution: String(institution).trim(),
      location: String(location).trim(),
      yearOrRole: String(yearOrRole).trim(),
      heardFrom: String(heardFrom).trim(),
      eventId: eventId || 'N/A',
      upiTransactionId: String(upiTransactionId).trim(),
    };

    // Save to MongoDB
    console.log('💾 Saving to MongoDB...');
    const booking = new RecordingRequest(bookingData);
    await booking.save();
    console.log('✅ Booking saved to MongoDB successfully');

    // Send emails (non-blocking)
    console.log('📧 Sending emails...');
    const emailData = { name, email, whatsapp, institution, location, yearOrRole, heardFrom, upiTransactionId };

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
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB not connected for GET request');
      return res.json([]);
    }

    const requests = await RecordingRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('❌ Error fetching recording requests:', err);
    // Return empty array instead of error if DB not available
    res.json([]);
  }
};
