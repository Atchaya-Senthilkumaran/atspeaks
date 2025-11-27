// Test Email Configuration - AT Speaks
// Usage: node test-email.js [recipient_email]
// Example: node test-email.js myemail@example.com

require('dotenv').config();
const nodemailer = require('nodemailer');

const testRecipient = process.argv[2] || process.env.EMAIL_USER;

console.log('🧪 Testing Email Configuration for AT Speaks\n');
console.log('═══════════════════════════════════════════\n');

// Configuration check
console.log('📋 Configuration Status:');
console.log('   EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? `✅ SET (${process.env.EMAIL_PASS.length} chars)` : '❌ NOT SET');
console.log('   Test recipient:', testRecipient);
console.log('');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('❌ ERROR: Email credentials not configured!\n');
  console.log('Please add to your .env file:');
  console.log('   EMAIL_USER=connect.atspeaks@gmail.com');
  console.log('   EMAIL_PASS=your_16_char_app_password\n');
  console.log('📖 See EMAIL-SETUP-GUIDE.md for instructions\n');
  process.exit(1);
}

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testEmail() {
  try {
    console.log('🔌 Step 1: Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    console.log('📧 Step 2: Sending test email...');
    console.log('   From:', process.env.EMAIL_USER);
    console.log('   To:', testRecipient);
    console.log('');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: testRecipient,
      subject: '✅ AT Speaks Email Test - SUCCESS!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1f3492 0%, #c8348f 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">✅ Email Working!</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1f3492;">Email Configuration Successful</h2>
            <p>Your AT Speaks email system is configured correctly and working!</p>
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Test Details:</strong></p>
              <p>• Sent at: ${new Date().toLocaleString()}</p>
              <p>• From: ${process.env.EMAIL_USER}</p>
              <p>• To: ${testRecipient}</p>
            </div>
            <p style="color: #1f3492; font-weight: bold;">Team AT Speaks</p>
          </div>
        </div>
      `,
    });

    console.log('✅ Test email sent SUCCESSFULLY!\n');
    console.log('═══════════════════════════════════════════\n');
    console.log('📬 Email Details:');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    console.log('\n🎉 SUCCESS! Check your inbox at:', testRecipient);
    console.log('   (Check Spam/Junk folder if not in Inbox)\n');
    console.log('✅ Registration emails will now work correctly!\n');

  } catch (error) {
    console.log('❌ Email test FAILED!\n');
    console.log('═══════════════════════════════════════════\n');
    console.log('Error:', error.message);
    console.log('');

    if (error.code === 'EAUTH' || error.message.includes('Invalid login')) {
      console.log('🔑 AUTHENTICATION ERROR\n');
      console.log('Common Solutions:');
      console.log('1. ✅ Use Gmail App Password (NOT your regular password)');
      console.log('2. ✅ Enable 2-Step Verification first');
      console.log('3. ✅ Generate App Password: https://myaccount.google.com/apppasswords');
      console.log('4. ✅ Remove ALL spaces from the 16-character password');
      console.log('5. ✅ Update .env file and restart server\n');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.log('🌐 CONNECTION ERROR\n');
      console.log('Solutions:');
      console.log('1. ✅ Check internet connection');
      console.log('2. ✅ Check firewall settings (allow port 587)');
      console.log('3. ✅ Try again in a moment\n');
    } else {
      console.log('⚠️  UNKNOWN ERROR\n');
      console.log('Please check:');
      console.log('1. .env file is in the correct location (server/.env)');
      console.log('2. No typos in EMAIL_USER and EMAIL_PASS');
      console.log('3. Restart the server after changing .env\n');
    }

    console.log('📖 For detailed help, see: EMAIL-SETUP-GUIDE.md\n');
    process.exit(1);
  }
}

testEmail();
