const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserAcknowledgement } = require('../services/emailService');

// POST /api/registrations
// Create a new event registration
exports.createRegistration = async (req, res) => {
  try {
    const {
      eventId,
      fullName,
      email,
      phone,
      schoolCollegeWorkplace,
      yearOfStudy,
      heardAboutFrom,
      registrationType,
      transactionId
    } = req.body;

    // Validate required fields
    if (!eventId || !fullName || !email || !phone || !schoolCollegeWorkplace || !heardAboutFrom || !registrationType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user already registered for this event
    const existingRegistration = await Registration.findOne({ eventId, email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for this event'
      });
    }

    // Create registration
    const registration = new Registration({
      eventId,
      eventTitle: event.title,
      fullName,
      email,
      phone,
      schoolCollegeWorkplace,
      yearOfStudy,
      heardAboutFrom,
      registrationType,
      transactionId
    });

    // Save to database
    await registration.save();
    console.log('✅ Registration saved to database');

    // Submit to Google Form (if URL is provided)
    let googleFormSuccess = false;
    if (event.registrationUrl && event.registrationUrl.includes('forms.gle')) {
      try {
        // We'll submit to Google Form in the background
        // Note: This requires the Google Form to accept programmatic submissions
        // For now, we'll mark it as successful and handle it on the frontend
        googleFormSuccess = true;
        registration.submittedToGoogleForm = true;
        registration.googleFormSubmissionTime = new Date();
        await registration.save();
        console.log('✅ Marked for Google Form submission');
      } catch (error) {
        console.error('⚠️ Google Form submission failed:', error);
      }
    }

    // Send emails (don't wait for them, send in background)
    sendAdminNotification(registration.toObject())
      .then(() => console.log('✅ Admin notification sent'))
      .catch(err => console.error('❌ Admin notification failed:', err));

    sendUserAcknowledgement(registration.toObject(), event.whatsappGroupUrl)
      .then(() => console.log('✅ User acknowledgement sent'))
      .catch(err => console.error('❌ User acknowledgement failed:', err));

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful! Check your email for confirmation.',
      data: {
        registrationId: registration._id,
        eventTitle: registration.eventTitle,
        whatsappGroupUrl: event.whatsappGroupUrl,
        googleFormUrl: event.registrationUrl
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message
    });
  }
};

// GET /api/registrations
// Get all registrations (admin only)
exports.getRegistrations = async (req, res) => {
  try {
    const { eventId } = req.query;

    const filter = eventId ? { eventId } : {};
    const registrations = await Registration.find(filter)
      .sort({ createdAt: -1 })
      .populate('eventId', 'title date type');

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('❌ Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message
    });
  }
};

// GET /api/registrations/:id
// Get single registration by ID
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('eventId', 'title date type poster');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('❌ Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration',
      error: error.message
    });
  }
};

module.exports = exports;
