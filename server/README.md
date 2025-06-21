# CourseWeaver Backend (FastAPI)

## Setup

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

## Endpoints
- POST `/api/generate-course`
- POST `/api/check-outcome`
- POST `/api/upload-syllabus`
- POST `/api/get-books` 