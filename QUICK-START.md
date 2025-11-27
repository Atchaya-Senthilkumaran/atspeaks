# 🚀 Quick Start Guide - Test Registration Form

## Problem: Registration Submit Button Not Working

**Root Cause**: Backend API is not deployed/accessible

**Solution**: Follow these steps to test locally, then deploy

---

## ⚡ Quick Test (5 Minutes)

### Terminal 1: Start Backend

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"
node server.js
```

**Expected output:**
```
🚀 Server running on port 5000
📡 Ready to handle requests
```

### Terminal 2: Start Frontend

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"
npm run dev
```

**Expected output:**
```
  VITE ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Test Registration

1. Open `http://localhost:5173` in browser
2. Go to Events section
3. Click "Register Now" on any upcoming workshop
4. Fill the form
5. Click "Submit"

**✅ Should work now!**

---

## 🧪 Test Backend API (Optional)

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"
node test-registration.js
```

This will:
- ✅ Check if backend is running
- ✅ Check MongoDB connection
- ✅ Test registration endpoint
- ✅ Confirm everything works

---

## 🌐 Deploy to Production

### 1. Deploy Backend

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"
npx vercel --prod
```

**Copy the URL** (e.g., `https://your-backend.vercel.app`)

### 2. Add Environment Variables

Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

Add these for **Production**:
```
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

Click "Redeploy"

### 3. Update Frontend API URL

**File**: `atspeaks/src/config/api.js`

Change line 8:
```javascript
const PRODUCTION_API_URL = 'https://your-backend.vercel.app';
```

**Important**: Use the BACKEND URL, not frontend URL!

### 4. Deploy Frontend

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"
git add .
git commit -m "Update API URL"
git push

# Or use Vercel CLI
npx vercel --prod
```

---

## 🐛 Troubleshooting

### Submit button does nothing

**Check 1**: Is backend running?
```bash
curl http://localhost:5000/api/health
```

**Check 2**: Open browser console (F12) - any errors?

**Check 3**: Check Network tab - is request being sent?

### "Failed to fetch" error

- Backend is not running → Start backend server
- Wrong port → Backend should be on port 5000

### "CORS error"

- Shouldn't happen - backend has CORS enabled
- If it does, restart backend server

### "MongoDB connection failed"

- Check `.env` file exists in server directory
- Ensure `MONGODB_URI` is set correctly

---

## 📁 Files Modified/Created

✅ **Modified**:
- `src/config/api.js` - Auto-detects local vs production

✅ **Created**:
- `REGISTRATION-FIX.md` - Detailed troubleshooting guide
- `server/test-registration.js` - Automated test script
- `server/package.json` - Backend dependencies
- `server/DEPLOY.md` - Deployment instructions

---

## 📞 Need Help?

1. **Check browser console** (F12 → Console)
2. **Check backend terminal** for errors
3. **Run test script**: `node server/test-registration.js`
4. Read detailed guide: `REGISTRATION-FIX.md`

---

## ✅ Registration Works When:

- ✅ Backend server is running on port 5000
- ✅ Frontend connects to correct backend URL
- ✅ MongoDB connection is successful
- ✅ No CORS errors
- ✅ Browser console shows no errors

**The registration code is already correct - you just need to start the backend!**
