from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import check_outcome_quality
from database import get_outcomes_collection

router = APIRouter()

class OutcomeInput(BaseModel):
    outcome: str

@router.post("/check-outcome")
async def check_outcome(data: OutcomeInput):
    result = check_outcome_quality(data.outcome)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result)
    # Save to DB
    get_outcomes_collection().insert_one({"input": data.outcome, **result})
    return result 