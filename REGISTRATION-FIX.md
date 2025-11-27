# ✅ Registration Submit Button Fix

## The Problem
The registration submit button is not working because the backend API is not accessible or not deployed yet.

## What I Fixed

### 1. Updated API Configuration ✅
**File**: `src/config/api.js`

Now automatically detects if you're running locally or in production:
- **Local development**: Uses `http://localhost:5000`
- **Production**: Uses your deployed backend URL

## How to Test Registration Locally (Recommended First Step)

### Step 1: Start the Backend Server

```bash
# Open a NEW terminal window
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"

# Make sure you have a .env file with MongoDB URI
# Create .env file if it doesn't exist:
echo MONGODB_URI=your_mongodb_connection_string > .env
echo EMAIL_USER=your_gmail@gmail.com >> .env
echo EMAIL_PASS=your_gmail_app_password >> .env

# Start the backend server
node server.js
```

You should see:
```
🚀 Server running on port 5000
📊 MongoDB URI: Set
🌍 Environment: development
📡 Ready to handle requests
```

### Step 2: Start the Frontend (in another terminal)

```bash
# Open ANOTHER terminal window
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"

# Start the frontend
npm run dev
```

### Step 3: Test the Registration

1. Open browser to `http://localhost:5173` (or the port Vite shows)
2. Navigate to Events section
3. Click on an upcoming workshop
4. Click "Register Now"
5. Fill out the registration form
6. Click "Submit"

**Expected behavior:**
- Submit button shows "Submitting..."
- Success message appears
- WhatsApp group link is shown
- Console shows API call to `http://localhost:5000/api/registrations`

## Deploying for Production

Once local testing works, deploy the backend:

### Step 1: Deploy Backend to Vercel

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"

# Login to Vercel (if not already)
npx vercel login

# Deploy backend
npx vercel --prod
```

**Copy the deployment URL** - it will look like:
```
https://your-backend-xxxx.vercel.app
```

### Step 2: Add Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your backend project
3. Go to Settings → Environment Variables
4. Add these variables for **Production**:
   ```
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=production
   ```
5. Click "Save"
6. Go to Deployments → Redeploy

### Step 3: Update Frontend API URL

**File**: `src/config/api.js`

Change line 8:
```javascript
const PRODUCTION_API_URL = 'https://your-backend-xxxx.vercel.app'; // ⚠️ Use YOUR backend URL here
```

### Step 4: Redeploy Frontend

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"

# Commit the API URL change
git add src/config/api.js
git commit -m "Update production API URL"
git push

# Or deploy directly with Vercel CLI
npx vercel --prod
```

## Troubleshooting

### Issue: "Submit button does nothing"

**Open browser console** (F12 → Console tab) and look for errors:

1. **"Failed to fetch"** or **"Network error"**
   - Backend is not running
   - **Solution**: Start backend server (see Step 1 above)

2. **"CORS error"**
   - Backend CORS is not configured
   - **Solution**: Backend already has CORS enabled, this shouldn't happen

3. **"404 Not Found"**
   - Wrong API URL
   - **Solution**: Check `src/config/api.js` has correct URL

4. **"500 Internal Server Error"**
   - Backend error (likely MongoDB connection)
   - **Solution**: Check backend console for errors, ensure MongoDB URI is set

### Issue: "Registration saved but no email sent"

This is OK - email sending happens in the background and won't block registration. Check:
1. Backend console for email errors
2. Ensure `EMAIL_USER` and `EMAIL_PASS` are set correctly
3. Gmail app password is valid (not regular password)

### Issue: "Already registered" error

This means you're trying to register with the same email twice. Use a different email or check your existing registrations.

## Testing the Backend API Directly

Test if backend is working:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok","mongo":"connected",...}
```

## Quick Debug Checklist

✅ Backend server is running on port 5000
✅ Frontend shows correct API URL in console
✅ MongoDB URI is set in backend .env
✅ Browser console shows no CORS errors
✅ Network tab shows POST request to `/api/registrations`
✅ Response status is 201 (success) or shows error message

## File Changes Made

✅ `src/config/api.js` - Updated to support local/production environments

## Next Steps

1. **Test locally first** using the instructions above
2. **Deploy backend** to Vercel
3. **Update PRODUCTION_API_URL** with deployed backend URL
4. **Redeploy frontend**
5. **Test in production**

---

## Need Help?

If registration still doesn't work:

1. **Check browser console** (F12 → Console) for errors
2. **Check backend console** for server errors
3. **Check Network tab** (F12 → Network) to see the API request
4. Share the error message for more specific help

The registration form code is correct - the issue is only with backend connectivity. Once backend is deployed and API URL is updated, it will work perfectly!
