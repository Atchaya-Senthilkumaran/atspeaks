# Backend Deployment Guide - AT Speaks API

## What Was Fixed

### ❌ Problem: "Cannot read properties of undefined (reading 'fsPath')"
This error occurred because:
1. Missing `package.json` file in the server directory
2. Incorrect `vercel.json` configuration
3. VS Code extensions couldn't parse the project structure

### ✅ Fixed
1. ✅ Created `package.json` with all required dependencies
2. ✅ Fixed `vercel.json` with proper builds configuration
3. ✅ Created `.vercelignore` to exclude unnecessary files

## Deploy Backend to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Navigate to server directory**:
```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks\server"
```

3. **Login to Vercel**:
```bash
vercel login
```

4. **Deploy**:
```bash
vercel --prod
```

### Method 2: Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Add New" → "Project"
3. Import your Git repository
4. Set **Root Directory** to: `atspeaks/server`
5. Framework Preset: **Other**
6. Click "Deploy"

## Required Environment Variables

Set these in Vercel Dashboard (Settings → Environment Variables):

```env
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### How to Add Environment Variables:
1. Go to your project in Vercel Dashboard
2. Click Settings → Environment Variables
3. Add each variable for **Production** environment
4. Redeploy your project

## Project Structure

```
server/
├── server.js                 (Main entry point)
├── package.json             (✅ FIXED - Was missing!)
├── vercel.json              (✅ FIXED - Updated configuration)
├── .vercelignore            (✅ NEW - Excludes test files)
├── config/
│   └── db.js                (MongoDB connection)
├── controllers/             (API logic)
├── models/                  (Mongoose schemas)
├── routes/                  (Express routes)
├── services/                (Email service)
└── utils/                   (Helper functions)
```

## Testing After Deployment

1. **Check deployment URL**: After deploy completes, Vercel will give you a URL like:
   ```
   https://your-project.vercel.app
   ```

2. **Test health endpoint**:
   ```bash
   curl https://your-project.vercel.app/api/health
   ```

3. **Expected response**:
   ```json
   {
     "status": "ok",
     "mongo": "connected",
     "timestamp": "2024-11-27T..."
   }
   ```

## Troubleshooting

### Issue: "Module not found"
- **Solution**: Make sure `package.json` exists and run `npm install` locally first

### Issue: "MongoDB connection failed"
- **Solution**: Check `MONGODB_URI` environment variable is set correctly in Vercel

### Issue: Still seeing fsPath error in VS Code
- **Solution**:
  1. Close VS Code completely
  2. Reopen the project
  3. Press `Ctrl+Shift+P` → "Reload Window"

### Issue: 404 errors on API routes
- **Solution**: Make sure routes are defined with `/api/` prefix in server.js

## Dependencies Included

✅ All required packages in `package.json`:
- express (^4.18.2) - Web framework
- cors (^2.8.5) - CORS middleware
- mongoose (^8.0.0) - MongoDB ODM
- dotenv (^16.3.1) - Environment variables
- nodemailer (^6.9.7) - Email sending

## Next Steps

1. Deploy the backend using Method 1 or 2 above
2. Copy the deployment URL
3. Update frontend `api.js` with the new backend URL:
   ```javascript
   const API_URL = 'https://your-backend-url.vercel.app';
   ```
4. Redeploy the frontend

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Node.js on Vercel: https://vercel.com/docs/functions/serverless-functions/runtimes/node-js
