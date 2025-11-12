# Vercel Deployment Setup Guide

## MongoDB Connection Setup for Vercel

### 1. MongoDB Atlas Configuration

1. **Network Access:**
   - Go to MongoDB Atlas Dashboard → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - **Important:** Even with 0.0.0.0/0, ensure your connection string is correct
   - Click "Confirm"

2. **Database User:**
   - Go to Database Access
   - Create a user with read/write permissions
   - Note the username and password

3. **Connection String:**
   - Go to Database → Connect → Drivers
   - Copy the connection string
   - Format: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority`
   - Replace `<username>`, `<password>`, and `<database-name>` with your actual values

### 2. Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Select your project
   - Go to Settings → Environment Variables

2. **Add Environment Variables:**
   - **Key:** `MONGO_URI`
   - **Value:** Your MongoDB connection string (from step 1.3)
   - **Environment:** Production, Preview, Development (select all)
   - Click "Save"

3. **Verify Environment Variables:**
   - Ensure `MONGO_URI` is set for Production environment
   - The value should start with `mongodb+srv://` or `mongodb://`

### 3. Connection String Format

Your MongoDB connection string should look like this:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/atspeaks?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `username` and `password` with your MongoDB Atlas credentials
- Replace `atspeaks` with your actual database name
- The connection string should be URL-encoded if it contains special characters
- Do NOT include angle brackets `<>` in the actual connection string

### 4. Common Issues and Solutions

#### Issue: "MongoDB connection failed"
**Solutions:**
- Verify `MONGO_URI` is set in Vercel environment variables
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify database user credentials are correct
- Ensure connection string is properly formatted
- Check Vercel function logs for detailed error messages

#### Issue: "Shows mock events instead of real events"
**Solutions:**
- This happens when MongoDB connection fails
- Check Vercel logs to see connection errors
- Verify `MONGO_URI` environment variable is set correctly
- Ensure MongoDB Atlas network access is configured
- Wait a few seconds after deployment for connection to establish

#### Issue: "Form validation fails even when fields are filled"
**Solutions:**
- Check browser console for error messages
- Verify all required fields are filled (no empty strings)
- Check backend logs in Vercel for validation errors
- Ensure event ID is being sent correctly
- Check if MongoDB connection is working (affects form submission)

### 5. Testing the Connection

1. **Check Health Endpoint:**
   - Visit: `https://your-vercel-url.vercel.app/api/health`
   - Should return: `{ "status": "ok", "mongo": "connected" }`

2. **Check Events Endpoint:**
   - Visit: `https://your-vercel-url.vercel.app/api/events`
   - Should return events from MongoDB (not mock data)

3. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Functions → View Logs
   - Look for MongoDB connection messages
   - Check for any error messages

### 6. MongoDB Atlas Security Best Practices

1. **Network Access:**
   - Use 0.0.0.0/0 only if necessary
   - Consider restricting to specific IP ranges for better security
   - Vercel functions use dynamic IPs, so 0.0.0.0/0 is required

2. **Database User:**
   - Create a dedicated user for the application
   - Use strong passwords
   - Grant only necessary permissions (read/write)

3. **Connection String:**
   - Never commit connection strings to git
   - Use environment variables in Vercel
   - Rotate passwords regularly

### 7. Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Network Access allows 0.0.0.0/0
- [ ] Database user is created with correct permissions
- [ ] Connection string is copied and formatted correctly
- [ ] `MONGO_URI` environment variable is set in Vercel
- [ ] Environment variable is set for Production environment
- [ ] Database is seeded with events (if needed)
- [ ] Health endpoint returns `mongo: "connected"`
- [ ] Events endpoint returns real events from MongoDB

### 8. Troubleshooting Steps

1. **Check Vercel Logs:**
   ```bash
   vercel logs
   ```
   Or check in Vercel Dashboard → Functions → Logs

2. **Test Connection Locally:**
   - Create `.env` file in `server/` directory
   - Add: `MONGO_URI=your_connection_string`
   - Run: `npm start`
   - Check if connection works locally

3. **Verify MongoDB Atlas:**
   - Check cluster status in MongoDB Atlas
   - Verify network access settings
   - Check database user permissions
   - Test connection from MongoDB Atlas UI

4. **Check Vercel Environment Variables:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Verify `MONGO_URI` is set
   - Check if it's set for the correct environment
   - Redeploy after adding/updating environment variables

### 9. Important Notes

- **Environment Variables:** After adding/updating environment variables in Vercel, you need to redeploy your application
- **Connection Caching:** The app uses connection caching for serverless functions, but connections may still need to be established per request
- **Timeouts:** MongoDB connection timeouts are set to 15 seconds. If your connection is slow, you may need to increase this
- **Cold Starts:** Vercel serverless functions may have cold starts. The first request might be slower as it establishes the MongoDB connection

### 10. Support

If you're still experiencing issues:
1. Check Vercel function logs for detailed error messages
2. Verify MongoDB Atlas cluster is accessible
3. Test the connection string locally
4. Check network access settings in MongoDB Atlas
5. Verify environment variables are set correctly in Vercel


