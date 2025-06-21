from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

from routes import course_routes, syllabus_routes, outcome_routes, book_routes

load_dotenv()

app = FastAPI(
    title="CourseWeaver API",
    description="AI-powered university course design assistant",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routes
app.include_router(course_routes.router, prefix="/api", tags=["courses"])
app.include_router(syllabus_routes.router, prefix="/api", tags=["syllabus"])
app.include_router(outcome_routes.router, prefix="/api", tags=["outcomes"])
app.include_router(book_routes.router, prefix="/api", tags=["books"])

@app.get("/")
async def root():
    return {"message": "CourseWeaver API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "CourseWeaver API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 