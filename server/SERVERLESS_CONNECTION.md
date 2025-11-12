# Serverless MongoDB Connection Pattern

## How It Works

This implementation uses a **serverless-compatible connection caching pattern** that works perfectly with Vercel serverless functions.

### Key Concepts

1. **Global Connection Cache**: Uses `global.mongoose` to cache connections across serverless invocations
2. **Connection Reuse**: Reuses existing connections when available (fast path)
3. **Per-Request Connection**: Connects on each request if not already connected
4. **Promise-Based**: Prevents multiple simultaneous connection attempts

### Connection Flow

```
Request 1 (Cold Start):
  └─> Check cache → Empty
  └─> Create connection promise
  └─> Connect to MongoDB
  └─> Cache connection
  └─> Use connection

Request 2 (Warm Start):
  └─> Check cache → Connection exists
  └─> Verify ready state
  └─> Reuse cached connection (fast!)
  └─> Use connection

Request 3 (Warm Start):
  └─> Check cache → Connection exists
  └─> Reuse cached connection (fast!)
  └─> Use connection
```

### Code Structure

#### `server/config/db.js`
- `connectDB(mongoUri)`: Establishes connection with caching
- `ensureConnection(mongoUri)`: Ensures connection before operations
- Uses `global.mongoose` for serverless caching

#### `server/server.js`
- Middleware calls `ensureConnection()` on each request
- Reuses cached connections automatically
- Falls back gracefully if connection fails

### Benefits

1. **Fast Response Times**: Cached connections are reused (no connection overhead)
2. **Serverless Compatible**: Works with Vercel's serverless architecture
3. **Resilient**: Handles connection failures gracefully
4. **Efficient**: Prevents multiple simultaneous connection attempts

### Environment Variables

Set in Vercel Dashboard:
- `MONGO_URI`: MongoDB connection string
- Or `MONGODB_URI`: Alternative environment variable name

### Connection String Format

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

### Important Notes

1. **Serverless Behavior**: Each request may run in a new container
2. **Connection Caching**: `global.mongoose` persists across requests in the same container
3. **Cold Starts**: First request may be slower (connection establishment)
4. **Warm Starts**: Subsequent requests are fast (connection reuse)

### Troubleshooting

#### Connection Not Working
1. Check `MONGO_URI` is set in Vercel environment variables
2. Verify MongoDB Atlas network access (0.0.0.0/0)
3. Check connection string format
4. Review Vercel function logs for errors

#### Slow Response Times
1. First request after cold start is slower (connection establishment)
2. Subsequent requests should be fast (cached connection)
3. Check MongoDB Atlas cluster performance
4. Monitor connection pool size

#### Connection Errors
1. Check MongoDB Atlas cluster status
2. Verify network access settings
3. Check connection string credentials
4. Review error logs in Vercel

### Testing

1. **Health Check**: `GET /api/health`
   - Returns connection status
   - Shows `mongo: "connected"` if working

2. **Events Endpoint**: `GET /api/events`
   - Returns events from MongoDB only
   - Returns empty array with error message if connection fails

3. **Check Logs**: View Vercel function logs
   - Look for connection messages
   - Check for errors

### Best Practices

1. **Always Use ensureConnection()**: Called automatically in middleware
2. **Handle Connection Failures**: Controllers return error responses with empty arrays
3. **Monitor Connection State**: Use health check endpoint
4. **Set Timeouts**: Connection timeouts prevent hanging requests
5. **Use Connection Pool**: Limited pool size for serverless (5 connections)

### Performance

- **Cold Start**: ~1-2 seconds (connection establishment)
- **Warm Start**: ~50-100ms (cached connection reuse)
- **Connection Pool**: 5 connections max (serverless-optimized)
- **Timeout**: 15 seconds (connection establishment)

### Security

1. **Never Commit Connection Strings**: Use environment variables
2. **Use Strong Passwords**: For MongoDB Atlas users
3. **Restrict Network Access**: Use IP whitelisting when possible
4. **Rotate Credentials**: Regularly update passwords
5. **Monitor Access**: Check MongoDB Atlas logs

### Resources

- [MongoDB Serverless Best Practices](https://www.mongodb.com/docs/atlas/serverless-instance/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html)

