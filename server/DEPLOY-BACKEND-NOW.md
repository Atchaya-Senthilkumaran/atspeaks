# 🚀 Deploy Backend to Vercel - Quick Guide

## The Situation

You're using the **deployed frontend** (https://atspeaksplease.vercel.app), but the **backend is not deployed yet**.

That's why registrations are failing - the frontend is trying to call an API that doesn't exist!

---

## ✅ Deploy Backend (3 Steps)

### Step 1: Deploy Backend to Vercel

Open a terminal and run:

```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"

# Login to Vercel (if not already logged in)
npx vercel login

# Deploy to production
npx vercel --prod
```

**When prompted**:
- Set up and deploy? → **Yes**
- Which scope? → Select your account
- Link to existing project? → **No** (create new)
- What's your project's name? → `atspeaks-backend` (or any name)
- In which directory is your code located? → **. (current directory)**
- Want to modify settings? → **No**

**Copy the deployment URL** - it will look like:
```
https://atspeaks-backend-xxxxx.vercel.app
```

### Step 2: Add Environment Variables on Vercel

1. Go to https://vercel.com/dashboard
2. Find your backend project (`atspeaks-backend`)
3. Click on it
4. Go to **Settings** → **Environment Variables**
5. Add these variables for **Production**:

```
MONGODB_URI=mongodb+srv://atspeaks_db_user:Atspeaks%232819@cluster0.9b27gax.mongodb.net/atspeaks?retryWrites=true&w=majority

EMAIL_USER=connect.atspeaks@gmail.com

EMAIL_PASS=gvzkrvnrfacroxto

NODE_ENV=production
```

6. Click **Save**
7. Go to **Deployments** tab
8. Click **⋯** on the latest deployment → **Redeploy**

### Step 3: Update Frontend API URL

Now update your frontend to use the new backend URL:

**File**: `src/config/api.js`

Change line 8:
```javascript
const PRODUCTION_API_URL = 'https://atspeaks-backend-xxxxx.vercel.app';
```

Replace `xxxxx` with your actual backend deployment URL.

Then deploy frontend:
```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"
git add src/config/api.js
git commit -m "Update production API URL"
git push

# Or deploy directly
npx vercel --prod
```

---

## 🧪 Test After Deployment

1. Wait 1-2 minutes for deployments to complete
2. Go to https://atspeaksplease.vercel.app
3. Try registering for an event
4. Should work now! ✅

---

## ⚠️ Important Notes

### Your Backend URL Structure

You'll have TWO different Vercel projects:

1. **Frontend**: `https://atspeaksplease.vercel.app` (already exists)
2. **Backend**: `https://atspeaks-backend-xxxxx.vercel.app` (needs to be created)

They are SEPARATE deployments.

### Checking Backend is Working

After deploying backend, test it:
```
https://your-backend-url.vercel.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "mongo": "connected"
}
```

---

## 🐛 If Deployment Fails

### Error: "No package.json found"
- Make sure you're in the `server` directory
- Check `server/package.json` exists

### Error: "Build failed"
- Check `server/vercel.json` exists
- Make sure all dependencies are in `server/package.json`

### Error: "Environment variables not working"
- After adding env vars, click **Redeploy**
- Env vars only apply to new deployments

---

## 📋 Quick Checklist

- [ ] Run `npx vercel --prod` from server directory
- [ ] Copy the deployment URL
- [ ] Add environment variables on Vercel Dashboard
- [ ] Redeploy backend after adding env vars
- [ ] Update `PRODUCTION_API_URL` in frontend
- [ ] Deploy frontend with updated URL
- [ ] Test registration on production site

---

## 🆘 Need Help?

If deployment fails, share:
1. The error message from `npx vercel --prod`
2. Screenshot of Vercel dashboard
3. Any error logs from Vercel

---

**Start with Step 1 and let me know how it goes!**
