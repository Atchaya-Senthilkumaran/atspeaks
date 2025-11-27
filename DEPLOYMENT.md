# Deployment Instructions for AT Speaks

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Navigate to project directory**:
```bash
cd "C:\Users\atcha\OneDrive\Desktop\AT Speaks\atspeaks"
```

3. **Deploy**:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Click "Deploy"

## Project Structure

This project has TWO parts:
- **Frontend (React)**: Located in `/atspeaks` - configured with `vercel.json` for SPA routing
- **Backend (Express)**: Located in `/atspeaks/server` - configured with separate `vercel.json` for serverless functions

## Environment Variables

Make sure these are set in Vercel Dashboard:
- `MONGODB_URI` or `MONGO_URI` - Your MongoDB connection string
- `NODE_ENV=production`

## Troubleshooting

### "Cannot read properties of undefined (reading 'fsPath')" Error
This is a VS Code extension error, not a deployment error:
1. Press `Ctrl+Shift+P` → "Reload Window"
2. Disable Vercel/ESLint extensions temporarily
3. Use terminal deployment instead of VS Code extensions

### Build Successful
Your build is working correctly. We verified it with:
```bash
npm run build
```
Output: `✓ built in 6.78s`
