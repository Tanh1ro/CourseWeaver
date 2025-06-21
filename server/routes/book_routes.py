from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import recommend_textbooks
from database import get_books_collection

router = APIRouter()

class BookInput(BaseModel):
    subject: str
    audience: str

@router.post("/get-books")
async def get_books(data: BookInput):
    result = recommend_textbooks(data.subject, data.audience)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result)
    # Save to DB
    get_books_collection().insert_one({**data.dict(), **result})
    return result 