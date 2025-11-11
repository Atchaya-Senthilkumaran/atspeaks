const Contact = require('../models/Contact');
const { sendContactAdminNotification, sendContactUserConfirmation } = require('../utils/emailService');
const mongoose = require('mongoose');

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject, and message are required' });
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    // Try to save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const c = new Contact(contactData);
        await c.save();
        console.log('✅ Contact message saved to MongoDB');
      } catch (dbError) {
        console.error('❌ Failed to save to MongoDB:', dbError.message);
        // Continue to send emails even if save fails
      }
    }

    // Send emails in background (don't block response)
    sendContactAdminNotification(contactData).catch(err =>
      console.error('Admin notification email failed:', err)
    );
    sendContactUserConfirmation(contactData).catch(err =>
      console.error('User confirmation email failed:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Message received! We\'ll get back to you within 24-48 hours.',
      note: 'A confirmation email has been sent to your inbox.'
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
