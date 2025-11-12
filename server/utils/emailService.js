const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

// Send email to admin about new booking
const sendAdminNotification = async (bookingData, eventDetails) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: 'connect.atspeaks@gmail.com',
    subject: `🎉 New Recording Booking - ${eventDetails.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
          .logo-section { text-align: center; padding: 20px 0; background: #fff; }
          .logo { width: 60px; height: 60px; margin: 0 auto 10px; }
          .brand-name { font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; }
          .header { background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .detail-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #1f3492; }
          .value { color: #666; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">AT Speaks</h1>
            <h2 style="margin: 10px 0 0 0;">🎉 New Recording Booking Received!</h2>
          </div>
          <div class="content">
            <div class="detail-row">
              <span class="label">Event:</span><br>
              <span class="value">${eventDetails.title}</span>
            </div>
            <div class="detail-row">
              <span class="label">Name:</span><br>
              <span class="value">${bookingData.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span><br>
              <span class="value">${bookingData.email}</span>
            </div>
            <div class="detail-row">
              <span class="label">WhatsApp:</span><br>
              <span class="value">${bookingData.whatsapp}</span>
            </div>
            <div class="detail-row">
              <span class="label">Institution:</span><br>
              <span class="value">${bookingData.institution}</span>
            </div>
            <div class="detail-row">
              <span class="label">Location:</span><br>
              <span class="value">${bookingData.location}</span>
            </div>
            <div class="detail-row">
              <span class="label">Year / Role:</span><br>
              <span class="value">${bookingData.yearOrRole}</span>
            </div>
            <div class="detail-row">
              <span class="label">Heard From:</span><br>
              <span class="value">${bookingData.heardFrom}</span>
            </div>
            <div class="detail-row">
              <span class="label">Payment Screenshot:</span><br>
              <span class="value">Uploaded to server/uploads/${bookingData.paymentScreenshot}</span>
            </div>
            <div class="detail-row">
              <span class="label">Booking Time:</span><br>
              <span class="value">${new Date().toLocaleString()}</span>
            </div>
          </div>
          <div class="footer">
            <p>AT Speaks - Automated Booking Notification</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
  }
};

// Send confirmation email to user (UPDATED)
const sendUserConfirmation = async (bookingData, eventDetails) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: bookingData.email,
    subject: `✅ Recording Registration Received - ${eventDetails.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
          .header { background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-icon { text-align: center; font-size: 60px; margin: 20px 0; }
          .message { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #1f3492; }
          .event-title { color: #1f3492; font-size: 20px; font-weight: bold; margin: 15px 0; }
          .detail { margin: 10px 0; }
          .label { font-weight: bold; color: #666; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
          .contact { margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px; }
          .brand-name { font-size: 28px; font-weight: bold; color: white; margin: 0 0 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">AT Speaks</h1>
            <h2 style="margin-top: 15px;">Your Recording Registration is Under Review</h2>
          </div>
          <div class="content">
            <div class="success-icon">📩</div>

            <div class="message">
              <p>Hi <strong>${bookingData.name}</strong>,</p>
              <p>Thank you for booking your spot! Your registration details have been received and are currently being verified by our team.</p>
            </div>

            <div class="event-title">📹 ${eventDetails.title}</div>

            <div class="detail">
              <span class="label">Event Date:</span> ${eventDetails.date}
            </div>
            <div class="detail">
              <span class="label">Booking Date:</span> ${new Date().toLocaleDateString()}
            </div>

            <div class="highlight">
              <strong>⏰ What’s Next?</strong><br>
              Once your registration is verified, you’ll receive the event recording link via this registered email within <strong>24–72 hours</strong>.
            </div>

            <div class="contact">
              <strong>📧 Need Help?</strong><br>
              If you haven’t received the recording after 72 hours, or have any questions, please reach out to us at:<br>
              <a href="mailto:connect.atspeaks@gmail.com">connect.atspeaks@gmail.com</a>
            </div>
          </div>
          <div class="footer">
            <p><strong>AT Speaks</strong> - Empowering Students Through Education</p>
            <p style="font-size: 12px; color: #999;">This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ User confirmation email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send user confirmation:', error);
  }
};

// Send email to admin about new contact form submission
const sendContactAdminNotification = async (contactData) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: 'connect.atspeaks@gmail.com',
    subject: `📧 New Contact Form Submission - ${contactData.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
          .logo-section { text-align: center; padding: 20px 0; background: #fff; }
          .header { background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .detail-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #1f3492; }
          .value { color: #666; }
          .message-box { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #1f3492; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">AT Speaks</h1>
            <h2 style="margin: 10px 0 0 0;">📧 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="detail-row">
              <span class="label">From:</span><br>
              <span class="value">${contactData.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span><br>
              <span class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></span>
            </div>
            <div class="detail-row">
              <span class="label">Subject:</span><br>
              <span class="value">${contactData.subject}</span>
            </div>
            <div class="message-box">
              <span class="label">Message:</span><br>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
            <div class="detail-row">
              <span class="label">Received At:</span><br>
              <span class="value">${new Date().toLocaleString()}</span>
            </div>
          </div>
          <div class="footer">
            <p>AT Speaks - Automated Contact Form Notification</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact admin notification email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send contact admin notification:', error);
  }
};

// Send confirmation email to user for contact form submission
const sendContactUserConfirmation = async (contactData) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: contactData.email,
    subject: '✅ We received your message - AT Speaks',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; }
          .header { background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-icon { text-align: center; font-size: 60px; margin: 20px 0; }
          .message { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #1f3492; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #1f3492; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
          .contact { margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">AT Speaks</h1>
            <h2 style="margin-top: 15px;">Thank You for Reaching Out!</h2>
          </div>
          <div class="content">
            <div class="success-icon">✉️</div>

            <div class="message">
              <p>Hi <strong>${contactData.name}</strong>,</p>
              <p>Thank you for getting in touch with AT Speaks! We've received your message and our team will review it shortly.</p>
            </div>

            <div class="highlight">
              <strong>📩 What's Next?</strong><br>
              Our team typically responds within <strong>24-48 hours</strong> during business days. We'll get back to you at <strong>${contactData.email}</strong> with a response to your inquiry.
            </div>

            <div class="contact">
              <strong>Need Immediate Assistance?</strong><br>
              For urgent matters, you can reach us directly at:<br>
              <a href="mailto:connect.atspeaks@gmail.com">connect.atspeaks@gmail.com</a>
            </div>
          </div>
          <div class="footer">
            <p><strong>AT Speaks</strong> - Empowering Students Through Education</p>
            <p style="font-size: 12px; color: #999;">This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact user confirmation email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send contact user confirmation:', error);
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  sendContactAdminNotification,
  sendContactUserConfirmation,
};
