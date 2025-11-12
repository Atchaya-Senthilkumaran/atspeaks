const RecordingRequest = require('../models/RecordingRequest');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserConfirmation } = require('../utils/emailService');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// POST - Create new recording request
exports.createRecordingRequest = async (req, res) => {
  try {
    console.log('📝 Recording request received');

    const { name, email, whatsapp, institution, location, yearOrRole, heardFrom, eventId } = req.body;

    // Validate fields
    if (!name || !email || !whatsapp || !institution || !location || !yearOrRole || !heardFrom) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.file) {
      console.error('❌ Payment screenshot missing');
      return res.status(400).json({ message: 'Payment screenshot is required' });
    }

    console.log('✅ File uploaded:', req.file.filename, '- Size:', req.file.size, 'bytes');

    // Store the filename and path
    const paymentScreenshot = req.file.filename;
    const paymentScreenshotPath = `/uploads/${req.file.filename}`;

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

    // Prepare booking data
    const bookingData = {
      name,
      email,
      whatsapp,
      institution,
      location,
      yearOrRole,
      heardFrom,
      eventId: eventId || 'N/A',
      paymentScreenshot,
      paymentScreenshotPath,
    };

    // Save to MongoDB
    console.log('💾 Saving to MongoDB...');
    const booking = new RecordingRequest(bookingData);
    await booking.save();
    console.log('✅ Booking saved to MongoDB successfully');

    // Send emails (non-blocking)
    console.log('📧 Sending emails...');
    const emailData = { name, email, whatsapp, institution, location, yearOrRole, heardFrom, paymentScreenshot };

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
    res.status(500).json({
      message: 'Failed to process booking',
      error: err.message
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
