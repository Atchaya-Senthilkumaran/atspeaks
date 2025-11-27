const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { sendAdminNotification, sendUserAcknowledgement } = require('../services/emailService');
const mongoose = require('mongoose');

// POST /api/registrations
// Create a new event registration
exports.createRegistration = async (req, res) => {
  try {
    console.log('\n🎯 ===== NEW REGISTRATION REQUEST =====');
    console.log('📥 Request body:', JSON.stringify(req.body, null, 2));
    console.log('🔌 MongoDB connection state:', mongoose.connection.readyState);
    console.log('   (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)');

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
      console.log('❌ Validation failed - missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    console.log('✅ Required fields validated');

    // Get event details
    console.log('🔍 Looking for event with ID:', eventId);
    const event = await Event.findById(eventId);
    if (!event) {
      console.log('❌ Event not found:', eventId);
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    console.log('✅ Event found:', event.title);

    // Note: Allowing multiple registrations from same email as per requirement
    // Users can register multiple times if needed

    // Create registration
    console.log('📝 Creating registration document...');
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

    console.log('💾 Attempting to save registration to database...');
    console.log('   Registration ID (before save):', registration._id);

    // Save to database
    const savedRegistration = await registration.save();
    console.log('✅ Registration saved to database successfully!');
    console.log('   Registration ID (after save):', savedRegistration._id);
    console.log('   Event Title:', savedRegistration.eventTitle);
    console.log('   User Email:', savedRegistration.email);
    console.log('   event id:',savedRegistration.eventId);

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

    // Send emails - We'll try to send them and log results
    console.log('\n📧 ===== SENDING EMAILS =====');
    console.log('📋 Email Configuration:');
    console.log('   EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
    console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? `✅ SET (${process.env.EMAIL_PASS.length} chars)` : '❌ NOT SET');
    console.log('   Admin Email To: connect.atspeaks@gmail.com');
    console.log('   User Email To:', savedRegistration.email);

    // Send admin notification
    console.log('\n📨 Sending admin notification...');
    try {
      const regData = savedRegistration.toObject();
      console.log('   Registration data keys:', Object.keys(regData));

      const adminEmailResult = await sendAdminNotification(regData);
      if (adminEmailResult && adminEmailResult.success) {
        console.log('✅ Admin notification sent successfully!');
      } else {
        console.log('⚠️ Admin notification failed:', adminEmailResult?.error || 'Unknown error');
      }
    } catch (err) {
      console.error('❌ Admin notification error:', err.message);
      console.error('   Stack:', err.stack);
    }

    // Send user acknowledgement
    console.log('\n📨 Sending user acknowledgement...');
    try {
      const regData = savedRegistration.toObject();
      const whatsappUrl = event.whatsappGroupUrl || '';
      console.log('   WhatsApp URL:', whatsappUrl || 'Not provided');

      const userEmailResult = await sendUserAcknowledgement(regData, whatsappUrl);
      if (userEmailResult && userEmailResult.success) {
        console.log('✅ User acknowledgement sent successfully to', savedRegistration.email);
      } else {
        console.log('⚠️ User acknowledgement failed:', userEmailResult?.error || 'Unknown error');
      }
    } catch (err) {
      console.error('❌ User acknowledgement error:', err.message);
      console.error('   Stack:', err.stack);
    }

    console.log('===== EMAIL SENDING COMPLETED =====\n');

    // Return success response
    console.log('📤 Sending success response to frontend...');
    const responseData = {
      success: true,
      message: 'Registration successful! Check your email for confirmation.',
      data: {
        registrationId: savedRegistration._id,
        eventTitle: savedRegistration.eventTitle,
        whatsappGroupUrl: event.whatsappGroupUrl,
        googleFormUrl: event.registrationUrl
      }
    };

    console.log('✅ Response data:', JSON.stringify(responseData, null, 2));
    console.log('🎯 ===== REGISTRATION COMPLETED SUCCESSFULLY =====\n');

    return res.status(201).json(responseData);

  } catch (error) {
    console.error('\n❌ ===== REGISTRATION ERROR =====');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('===== END ERROR =====\n');

    return res.status(500).json({
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
