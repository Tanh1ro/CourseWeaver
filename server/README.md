# CourseWeaver Backend (FastAPI)

## Local Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and fill in your keys.
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Deployment to Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize Railway project:**
   ```bash
   cd server
   railway init
   ```

4. **Set environment variables:**
   ```bash
   railway variables set GEMINI_API_KEY=your_gemini_api_key_here
   railway variables set MONGODB_URI=your_mongodb_uri_here
   railway variables set DATABASE_NAME=courseweaver
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get your deployment URL:**
   ```bash
   railway domain
   ```

## Environment Variables

Required environment variables:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `MONGODB_URI`: MongoDB connection string (optional for local development)
- `DATABASE_NAME`: Database name (default: courseweaver)

## Endpoints
- POST `/api/generate-course`
- POST `/api/check-outcome`
- POST `/api/upload-syllabus`
- POST `/api/get-books` 