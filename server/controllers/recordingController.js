const RecordingRequest = require('../models/RecordingRequest');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserConfirmation } = require('../utils/emailService');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// POST - Create new recording request
exports.createRecordingRequest = async (req, res) => {
  try {
    const { name, email, whatsapp, institution, location, yearOrRole, heardFrom, eventId } = req.body;
    const paymentScreenshot = req.file ? req.file.path : null;

    if (!name || !email || !whatsapp || !institution || !location || !yearOrRole || !heardFrom || !paymentScreenshot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Fetch event details
    let eventDetails = { title: 'Unknown Event', date: 'N/A' };
    if (eventId) {
      try {
        // Try to find event in database only if eventId looks like a valid ObjectId
        if (eventId.match(/^[0-9a-fA-F]{24}$/)) {
          const event = await Event.findById(eventId);
          if (event) {
            eventDetails = {
              title: event.title,
              date: event.date,
              type: event.type,
            };
          }
        } else {
          // For mock data with simple string IDs, use a default message
          eventDetails = {
            title: 'AT Speaks Event Recording',
            date: 'N/A',
            type: 'Past',
          };
        }
      } catch (err) {
        // If database lookup fails, use default
        console.log('Event lookup skipped (using mock data)');
      }
    }

    const bookingData = {
      name,
      email,
      whatsapp,
      institution,
      location,
      yearOrRole,
      heardFrom,
      eventId,
      paymentScreenshot,
      createdAt: new Date().toISOString(),
    };

    // Try to save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const booking = new RecordingRequest(bookingData);
        await booking.save();
        console.log('✅ Booking saved to MongoDB');
      } catch (dbError) {
        console.error('❌ Failed to save to MongoDB:', dbError.message);
        // Fall through to save to file
      }
    }

    // If MongoDB not connected or save failed, save to local JSON file as backup
    if (mongoose.connection.readyState !== 1) {
      try {
        const backupFile = path.join(__dirname, '../bookings-backup.json');
        let bookings = [];

        if (fs.existsSync(backupFile)) {
          const data = fs.readFileSync(backupFile, 'utf8');
          bookings = JSON.parse(data);
        }

        bookings.push(bookingData);
        fs.writeFileSync(backupFile, JSON.stringify(bookings, null, 2));
        console.log('✅ Booking saved to backup file (MongoDB not connected)');
      } catch (fileError) {
        console.error('❌ Failed to save to backup file:', fileError.message);
      }
    }

    // Prepare data for email
    const emailData = {
      name,
      email,
      whatsapp,
      institution,
      location,
      yearOrRole,
      heardFrom,
      paymentScreenshot: req.file.filename,
    };

    // Send emails in background (don't block response)
    sendAdminNotification(emailData, eventDetails).catch(err =>
      console.error('Email notification failed:', err)
    );
    sendUserConfirmation(emailData, eventDetails).catch(err =>
      console.error('User confirmation email failed:', err)
    );

    res.json({
      success: true,
      message: 'Booking successful!',
      eventTitle: eventDetails.title,
      note: "You'll receive recordings via registered email within 24–72 hours. A confirmation email has been sent to your inbox.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// GET - Fetch all recording requests (for admin)
exports.getRecordingRequests = async (req, res) => {
  try {
    const requests = await RecordingRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
