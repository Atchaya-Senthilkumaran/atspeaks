require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

console.log('Testing email configuration...');
console.log('Email User:', process.env.EMAIL_USER);
console.log('Password Length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
console.log('Password (first 4 chars):', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 4) + '...' : 'NOT SET');

async function testEmail() {
  try {
    console.log('\nVerifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from AT Speaks',
      html: '<h1>Success!</h1><p>Your email configuration is working correctly.</p>',
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);

    if (error.code === 'EAUTH') {
      console.log('\n⚠️  AUTHENTICATION FAILED - Check these:');
      console.log('1. Is 2-Step Verification enabled on your Google Account?');
      console.log('2. Did you generate an App Password (not your regular password)?');
      console.log('3. Did you remove ALL spaces from the 16-character app password?');
      console.log('4. Is EMAIL_USER exactly: connect.atspeaks@gmail.com ?');
    }
  }
}

testEmail();
