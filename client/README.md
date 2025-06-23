# CourseWeaver Frontend (React + Tailwind)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## Features
- Course Builder: Auto-generate syllabus, outcomes, labs, and textbooks
- Course Evaluator: Upload and analyze .docx/.pdf syllabus files
- Book Recommender: Get textbook and online resource suggestions

## Tech Stack
- React.js
- Tailwind CSS
- PWA template

## API
- Connects to FastAPI backend at `/api` endpoints 

# Deploying to Vercel

## Prerequisites
1. Deploy your backend to Railway (see server/README.md)
2. Get your Railway deployment URL

## Frontend Deployment
1. Go to https://vercel.com/import
2. Select your GitHub repository (CourseWeaver)
3. Set the project root to the `client` folder
4. Use the default build command (`npm run build`) and output directory (`build`)
5. Add environment variable:
   - Name: `REACT_APP_API_URL`
   - Value: Your Railway backend URL (e.g., `https://your-app.railway.app`)
6. Click Deploy

## Environment Variables
- `REACT_APP_API_URL`: Your backend API URL (required for production) 