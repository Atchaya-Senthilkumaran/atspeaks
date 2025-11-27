# 🐛 Debug Registration Issues

## Problem
- ✅ Recording bookings work (emails + database storage)
- ❌ Event registrations show success but emails don't send and data doesn't save

## ✅ What I Fixed

I've added **extensive logging** to the registration controller to see exactly what's happening.

---

## 🧪 How to Test & Debug

### Step 1: Start Backend Server

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"
node server.js
```

**Keep this terminal open** - you'll see detailed logs here.

### Step 2: Start Frontend (in another terminal)

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"
npm run dev
```

### Step 3: Test Registration

1. Open browser to `http://localhost:5173`
2. Navigate to Events section
3. Click "Register Now" on upcoming workshop
4. Fill out the registration form
5. Click "Submit"

### Step 4: Check Backend Console Output

You should see detailed logs like:

```
🎯 ===== NEW REGISTRATION REQUEST =====
📥 Request body: {
  "eventId": "...",
  "fullName": "Test User",
  "email": "test@example.com",
  ...
}
🔌 MongoDB connection state: 1
   (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)

✅ Required fields validated

🔍 Looking for event with ID: 674728381234567890abcdef
✅ Event found: Portfolio Launchpad Workshop

📝 Creating registration document...
💾 Attempting to save registration to database...
   Registration ID (before save): 674728381234567890abcdef

✅ Registration saved to database successfully!
   Registration ID (after save): 674728381234567890abcdef
   Event Title: Portfolio Launchpad Workshop
   User Email: test@example.com

📧 ===== SENDING EMAILS =====
📋 Email Configuration:
   EMAIL_USER: connect.atspeaks@gmail.com
   EMAIL_PASS: ✅ SET (16 chars)
   Admin Email To: connect.atspeaks@gmail.com
   User Email To: test@example.com

📨 Sending admin notification...
   Registration data keys: [...]
✅ Admin notification sent successfully!

📨 Sending user acknowledgement...
   WhatsApp URL: https://...
✅ User acknowledgement sent successfully to test@example.com

===== EMAIL SENDING COMPLETED =====

📤 Sending success response to frontend...
✅ Response data: {...}
🎯 ===== REGISTRATION COMPLETED SUCCESSFULLY =====
```

---

## 🔍 What to Look For

### Issue 1: MongoDB Not Connected

If you see:
```
🔌 MongoDB connection state: 0
   (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
```

**Solution**: Check `.env` file has correct `MONGODB_URI`

### Issue 2: Data Not Saving

If you see error when saving:
```
❌ ===== REGISTRATION ERROR =====
Error name: MongoError
Error message: ...
```

**Solutions**:
1. MongoDB connection issue → Check MONGODB_URI
2. Validation error → Check Registration model schema
3. Permission error → Check MongoDB user permissions

### Issue 3: Emails Not Sending

If you see:
```
⚠️ Admin notification failed: Email not configured
```
or
```
❌ Admin notification error: Invalid login
```

**Solutions**:
1. **Email not configured**:
   - Check `.env` has `EMAIL_USER` and `EMAIL_PASS`
   - Restart server after changing `.env`

2. **Invalid login**:
   - Make sure using Gmail App Password (not regular password)
   - See `EMAIL-SETUP-GUIDE.md`

3. **Connection timeout**:
   - Check internet connection
   - Check firewall settings

### Issue 4: Event Not Found

If you see:
```
❌ Event not found: 123456789
```

**Solutions**:
1. Make sure events exist in database
2. Check eventId being sent from frontend
3. Verify MongoDB has events collection with data

---

## 🧪 Quick Test Without Frontend

Test the API directly:

```bash
# Get an event ID first
curl http://localhost:5000/api/events

# Copy an event ID from the response, then test registration
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "PASTE_EVENT_ID_HERE",
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "schoolCollegeWorkplace": "Test College, Chennai",
    "yearOfStudy": "2nd Year",
    "heardAboutFrom": "Website",
    "registrationType": "Workshop Only - Free",
    "transactionId": ""
  }'
```

---

## 📊 Check Database Directly

### Verify Registration Was Saved

```bash
# In MongoDB Compass or MongoDB shell
use atspeaks
db.registrations.find().sort({createdAt: -1}).limit(5)
```

This shows the last 5 registrations. If empty, data is NOT being saved.

---

## 🔧 Common Issues & Fixes

### Issue: Success message shows but nothing happens

**Likely cause**: Frontend is mocking the success or API URL is wrong

**Check**:
1. Browser console (F12 → Console) for API calls
2. Network tab (F12 → Network) - look for POST to `/api/registrations`
3. Check response status (should be 201)

### Issue: "Network Error" in browser

**Likely cause**: Backend not running or wrong API URL

**Check**:
1. Backend server is running
2. API URL in `src/config/api.js` is correct
3. CORS is enabled (already enabled in your backend)

### Issue: Registration saves but emails don't send

**Likely cause**: Email credentials not configured properly

**Solutions**:
1. Run email test: `node test-email.js your_email@example.com`
2. Check `.env` has correct `EMAIL_USER` and `EMAIL_PASS`
3. Verify Gmail App Password is valid
4. Check backend console for email errors

---

## 📋 Debug Checklist

Before asking for more help, verify:

- ✅ Backend server is running (`node server.js`)
- ✅ Frontend is running (`npm run dev`)
- ✅ MongoDB is connected (check backend console)
- ✅ `.env` file has all required variables
- ✅ Gmail App Password is set correctly
- ✅ Email test passes (`node test-email.js`)
- ✅ Events exist in database (check MongoDB)
- ✅ Browser console shows no errors
- ✅ Network tab shows successful POST request

---

## 📧 Email Test

Test email separately:

```bash
cd server
node test-email.js your_email@example.com
```

Should show:
```
✅ SMTP connection successful!
✅ Test email sent SUCCESSFULLY!
```

---

## 📝 Next Steps

1. **Run the test** (Steps 1-4 above)
2. **Copy the backend console output** and send it to me
3. **Check browser console** (F12) for any errors
4. **Verify database** has the registration

With the detailed logs, I can see exactly where the issue is!

---

## 🆘 Still Having Issues?

Send me:
1. ✅ Complete backend console output (from the detailed logs)
2. ✅ Browser console errors (F12 → Console)
3. ✅ Network tab request/response (F12 → Network → /api/registrations)
4. ✅ Result of email test (`node test-email.js`)

This will help me pinpoint the exact issue!
