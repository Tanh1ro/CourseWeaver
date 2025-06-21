# CourseWeaver Troubleshooting Guide

## Common Issues and Solutions

### 1. 500 Internal Server Error - Course Generation

**Symptoms:**
- "Failed to load resource: the server responded with a status of 500"
- "Error generating course: Error: [object Object]"

**Causes:**
- Missing or invalid Gemini API key
- Network connectivity issues
- Server configuration problems

**Solutions:**

#### A. Set up Gemini API Key

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Configure the API Key:**
   ```bash
   # Navigate to server directory
   cd server
   
   # Run the setup script
   python setup_env.py
   
   # Edit the .env file and replace 'your_gemini_api_key_here' with your actual key
   # Example:
   GEMINI_API_KEY=AIzaSyC...your_actual_key_here
   ```

#### B. Check Server Status

1. **Verify server is running:**
   ```bash
   cd server
   python main.py
   ```

2. **Check server logs for errors:**
   - Look for error messages in the terminal where the server is running
   - Common errors include:
     - "GEMINI_API_KEY not configured"
     - "Invalid API key"
     - Network connection errors

#### C. Test API Endpoint

1. **Test the health endpoint:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Test the course generation endpoint:**
   ```bash
   curl -X POST http://localhost:8000/api/generate-course \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Course",
       "credits": "3",
       "ltp": "2:0:2",
       "audience": "B.Tech CSE"
     }'
   ```

### 2. Frontend Connection Issues

**Symptoms:**
- "Failed to fetch" errors
- Network errors in browser console

**Solutions:**

1. **Check if frontend is pointing to correct backend:**
   - Ensure frontend is running on `http://localhost:3000`
   - Ensure backend is running on `http://localhost:8000`
   - Check CORS configuration in `server/main.py`

2. **Verify proxy configuration:**
   - Check if `client/package.json` has proxy configuration
   - Should have: `"proxy": "http://localhost:8000"`

### 3. Database Connection Issues

**Symptoms:**
- Database save errors in server logs
- Course generation works but data isn't saved

**Solutions:**

1. **Install and start MongoDB:**
   ```bash
   # On Windows (using Chocolatey)
   choco install mongodb
   
   # On macOS (using Homebrew)
   brew install mongodb-community
   
   # Start MongoDB service
   mongod
   ```

2. **Check database configuration:**
   - Verify `MONGODB_URI` in `.env` file
   - Default: `mongodb://localhost:27017`

### 4. Environment Setup Issues

**Symptoms:**
- Import errors
- Missing dependencies

**Solutions:**

1. **Install Python dependencies:**
   ```bash
   cd server
   pip install -r requirements.txt
   ```

2. **Install Node.js dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Set up virtual environment:**
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### 5. Debugging Steps

#### Enable Detailed Logging

1. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for error messages in Console tab
   - Check Network tab for failed requests

2. **Check server logs:**
   - Look at terminal where server is running
   - Check for Python error messages
   - Look for API call logs

3. **Test individual components:**
   ```bash
   # Test Gemini service directly
   cd server
   python -c "
   from services.gemini_service import generate_course_syllabus
   result = generate_course_syllabus('Test', '3', '2:0:2', 'B.Tech CSE')
   print(result)
   "
   ```

### 6. Common Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "GEMINI_API_KEY not configured" | Missing API key | Set up API key in .env file |
| "Invalid API key" | Wrong or expired key | Get new key from Google AI Studio |
| "Connection refused" | Server not running | Start server with `python main.py` |
| "CORS error" | Frontend/backend port mismatch | Check CORS configuration |
| "Module not found" | Missing dependencies | Run `pip install -r requirements.txt` |

### 7. Getting Help

If you're still experiencing issues:

1. **Check the logs:** Look at both browser console and server terminal
2. **Verify setup:** Run `python setup_env.py` to check configuration
3. **Test endpoints:** Use curl or Postman to test API directly
4. **Check versions:** Ensure you're using compatible versions of Python, Node.js, etc.

### 8. Quick Fix Checklist

- [ ] Gemini API key is set in `.env` file
- [ ] Server is running on port 8000
- [ ] Frontend is running on port 3000
- [ ] All dependencies are installed
- [ ] MongoDB is running (if using database)
- [ ] No firewall blocking connections
- [ ] CORS is properly configured 