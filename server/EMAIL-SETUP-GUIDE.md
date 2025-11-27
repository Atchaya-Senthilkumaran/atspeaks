# 📧 Email Setup Guide for AT Speaks

## Problem: Emails Not Being Sent

If you're not receiving registration emails, it's because Gmail App Password is not configured.

## ✅ Quick Fix (5 Minutes)

### Step 1: Generate Gmail App Password

1. **Go to your Google Account Security**
   - Visit: https://myaccount.google.com/security
   - Sign in with **connect.atspeaks@gmail.com**

2. **Enable 2-Step Verification** (if not already enabled)
   - Scroll to "2-Step Verification"
   - Click "Get Started"
   - Follow the steps to enable it

3. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - OR go to Security → 2-Step Verification → App passwords (at bottom)
   - Select app: **Mail**
   - Select device: **Windows Computer** (or Other)
   - Click **Generate**
   - **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Update .env File

**File**: `server/.env`

Replace this line:
```env
EMAIL_PASS=your_app_password_here
```

With your actual app password (remove spaces):
```env
EMAIL_PASS=abcdefghijklmnop
```

**Important**:
- ✅ Use the 16-character App Password (NO spaces)
- ❌ DO NOT use your regular Gmail password
- ✅ Make sure `EMAIL_USER=connect.atspeaks@gmail.com`

### Step 3: Restart Backend Server

```bash
# Stop the server (Ctrl+C if running)
# Then restart:
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"
node server.js
```

### Step 4: Test Registration

1. Open frontend
2. Register for an event
3. Check backend console - you should see:
   ```
   📧 Attempting to send emails...
      EMAIL_USER configured: true
      EMAIL_PASS configured: true
   ✅ Admin notification sent successfully to connect.atspeaks@gmail.com
   ✅ User acknowledgement sent successfully to user@example.com
   ```

4. **Check your emails:**
   - Admin email at: **connect.atspeaks@gmail.com**
   - User email at: the email you used for registration

## 🔍 Troubleshooting

### Issue: "EMAIL_USER configured: false" or "EMAIL_PASS configured: false"

**Solution**: Your `.env` file is not being loaded or has wrong values.

1. Check `.env` file exists at: `server/.env`
2. Make sure there are NO quotes around values:
   ```env
   ✅ EMAIL_USER=connect.atspeaks@gmail.com
   ❌ EMAIL_USER="connect.atspeaks@gmail.com"
   ```
3. Restart the server after editing .env

### Issue: "Error: Invalid login: 535-5.7.8 Username and Password not accepted"

**Solutions:**

1. **Using regular password instead of App Password**
   - Generate App Password (see Step 1 above)
   - Use App Password in .env file

2. **2-Step Verification not enabled**
   - Enable 2-Step Verification first
   - Then generate App Password

3. **Less secure app access** (Old method - not recommended)
   - Google is phasing this out
   - Use App Password instead

### Issue: Email sends but goes to Spam

**Solution**: This is normal for first-time senders. Ask recipients to:
1. Check Spam/Junk folder
2. Mark email as "Not Spam"
3. Add `connect.atspeaks@gmail.com` to contacts

### Issue: "Authentication failed" or "Connection timeout"

**Check:**

1. **Correct Gmail address**
   ```env
   EMAIL_USER=connect.atspeaks@gmail.com
   ```

2. **App Password is correct** (16 characters, no spaces)
   ```env
   EMAIL_PASS=abcdefghijklmnop
   ```

3. **Internet connection is working**

4. **Firewall not blocking** port 587 (Gmail SMTP)

## 📋 Complete .env File Example

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://atspeaks_db_user:password@cluster0.xxxxx.mongodb.net/atspeaks?retryWrites=true&w=majority

# Email Configuration
EMAIL_USER=connect.atspeaks@gmail.com
EMAIL_PASS=abcdefghijklmnop

# Environment
NODE_ENV=development
PORT=5000
```

## 🚀 For Production (Vercel)

When deploying to Vercel:

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your backend project
   - Settings → Environment Variables

2. **Add these variables for Production:**
   ```
   EMAIL_USER=connect.atspeaks@gmail.com
   EMAIL_PASS=your_16_char_app_password
   MONGODB_URI=your_mongodb_uri
   NODE_ENV=production
   ```

3. **Redeploy**
   - Deployments tab → Redeploy

## 🧪 Test Email Functionality

Create a simple test script:

```bash
cd server
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'your_test_email@example.com',
  subject: 'Test Email from AT Speaks',
  text: 'If you receive this, email is working!'
}, (err, info) => {
  if (err) {
    console.log('❌ Error:', err.message);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
"
```

## 📧 Email Templates

### Admin Email
- **Recipient**: connect.atspeaks@gmail.com
- **Subject**: "New Registration: {Event Title}"
- **Contains**: Full registration details

### User Email
- **Recipient**: User's email
- **Subject**: "Registration Confirmed: {Event Title}"
- **Contains**: Registration confirmation + WhatsApp link

## ✅ Changes Made

1. ✅ **Removed duplicate registration restriction**
   - Users can now register multiple times with same email

2. ✅ **Improved email logging**
   - Shows exactly which emails are sent
   - Shows errors clearly in console

3. ✅ **Created .env file**
   - Template with all required variables

4. ✅ **Better error handling**
   - Registration succeeds even if email fails
   - Clear error messages for debugging

## 🎯 Quick Checklist

Before testing registration:
- ✅ Gmail App Password generated
- ✅ `.env` file updated with App Password
- ✅ Backend server restarted
- ✅ Console shows email credentials are configured
- ✅ MongoDB connected

After registration:
- ✅ Check backend console for email success messages
- ✅ Check `connect.atspeaks@gmail.com` inbox
- ✅ Check user's email inbox (and spam folder)

---

**Note**: App Passwords are safer than using your actual Gmail password and they don't expire unless you revoke them.

If you still have issues, check the backend console output when registration happens - it will tell you exactly what went wrong!
