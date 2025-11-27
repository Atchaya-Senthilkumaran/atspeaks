const nodemailer = require('nodemailer');

// Create transporter using Gmail
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials not configured');
    return null;
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates (for development)
    }
  });
};

// Send registration notification to admin
const sendAdminNotification = async (registrationData) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('⚠️ Skipping admin notification - email not configured');
    return { success: false, error: 'Email not configured' };
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'connect.atspeaks@gmail.com',
    subject: `New Registration: ${registrationData.eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f3492;">New Event Registration</h2>
        <p>A new registration has been received for <strong>${registrationData.eventTitle}</strong></p>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f3492; margin-top: 0;">Registration Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Timestamp:</td>
              <td style="padding: 8px 0;">${new Date(registrationData.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0;">${registrationData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Personal Email:</td>
              <td style="padding: 8px 0;">${registrationData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px 0;">${registrationData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Institution:</td>
              <td style="padding: 8px 0;">${registrationData.schoolCollegeWorkplace}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Year of Study:</td>
              <td style="padding: 8px 0;">${registrationData.yearOfStudy || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Heard About From:</td>
              <td style="padding: 8px 0;">${registrationData.heardAboutFrom}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Registration Type:</td>
              <td style="padding: 8px 0;">${registrationData.registrationType}</td>
            </tr>
            ${registrationData.transactionId ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Transaction ID:</td>
              <td style="padding: 8px 0;">${registrationData.transactionId}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This registration has been saved to the database and ${registrationData.submittedToGoogleForm ? 'successfully submitted to Google Form' : 'is pending Google Form submission'}.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    return { success: false, error: error.message };
  }
};

// Send acknowledgement email to user
const sendUserAcknowledgement = async (registrationData, whatsappGroupUrl) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('⚠️ Skipping user acknowledgement - email not configured');
    return { success: false, error: 'Email not configured' };
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: registrationData.email,
    subject: `Registration Confirmed: ${registrationData.eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">AT Speaks</h1>
          <p style="color: white; margin: 10px 0 0 0;">Building Future-Ready Minds</p>
        </div>

        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #1f3492;">Registration Confirmed!</h2>
          <p>Dear ${registrationData.fullName},</p>
          <p>Thank you for registering for <strong>${registrationData.eventTitle}</strong>!</p>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1f3492;">
            <h3 style="color: #1f3492; margin-top: 0;">Your Registration Details</h3>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${registrationData.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${registrationData.phone}</p>
            <p style="margin: 5px 0;"><strong>Registration Type:</strong> ${registrationData.registrationType}</p>
            ${registrationData.transactionId ? `<p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${registrationData.transactionId}</p>` : ''}
          </div>

          ${whatsappGroupUrl ? `
          <div style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: white; margin-top: 0;">Join Our WhatsApp Group</h3>
            <p style="color: white; margin: 10px 0;">Stay connected and get event updates!</p>
            <a href="${whatsappGroupUrl}" style="display: inline-block; background-color: white; color: #128C7E; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 10px;">Join Group</a>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
            <p style="margin: 5px 0;"><strong>What's Next?</strong></p>
            <ul style="color: #666;">
              <li>You will receive event details and joining link before the event</li>
              <li>Make sure to join our WhatsApp group for updates</li>
              <li>For any queries, contact us at connect.atspeaks@gmail.com</li>
            </ul>
          </div>

          <p style="margin-top: 30px;">Looking forward to seeing you at the event!</p>
          <p style="color: #1f3492; font-weight: bold;">Team AT Speaks</p>
        </div>

        <div style="background-color: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 5px 0; font-size: 14px;">🌐 www.theatspeaks.com</p>
          <p style="margin: 5px 0; font-size: 14px;">📧 connect.atspeaks@gmail.com</p>
          <p style="margin: 5px 0; font-size: 12px; color: #999;">© 2025 AT Speaks. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ User acknowledgement email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending user acknowledgement:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAdminNotification,
  sendUserAcknowledgement
};
