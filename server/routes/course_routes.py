from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import generate_course_syllabus
from database import get_courses_collection

router = APIRouter()

class CourseInput(BaseModel):
    title: str
    credits: str
    ltp: str
    audience: str

@router.post("/generate-course")
async def generate_course(course: CourseInput):
    result = generate_course_syllabus(course.title, course.credits, course.ltp, course.audience)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result)
    # Save to DB
    get_courses_collection().insert_one({**course.dict(), **result})
    return result 