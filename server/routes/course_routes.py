from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import generate_course_syllabus
from database import get_courses_collection
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class CourseInput(BaseModel):
    title: str
    credits: str
    ltp: str
    audience: str

@router.post("/generate-course")
async def generate_course(course: CourseInput):
    try:
        logger.info(f"Generating course: {course.title}")
        result = generate_course_syllabus(course.title, course.credits, course.ltp, course.audience)
        
        if "error" in result:
            logger.error(f"Course generation failed: {result['error']}")
            raise HTTPException(
                status_code=500, 
                detail={
                    "error": result["error"],
                    "details": result.get("details", "Unknown error occurred")
                }
            )
        
        # Save to DB
        try:
            get_courses_collection().insert_one({**course.dict(), **result})
        except Exception as db_error:
            logger.warning(f"Failed to save to database: {db_error}")
            # Don't fail the request if DB save fails
        
        logger.info(f"Successfully generated course: {course.title}")
        return result
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error in generate_course: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "details": "An unexpected error occurred while generating the course"
            }
        ) 