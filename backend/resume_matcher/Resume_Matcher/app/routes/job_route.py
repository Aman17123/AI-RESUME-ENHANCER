from fastapi import APIRouter, HTTPException, Depends
from services.job_matching_service import JobMatchingService
from services.job_recomendation_service import JobRecommendationService
from database.job_db import JobDB

router = APIRouter()

def get_job_matching_services():
  return JobMatchingService()

def get_job_recommendation_service():
  return JobRecommendationService()

def get_job_db():
  return JobDB()

@router.get("/get")
async def get_all_jobs(job_db: JobDB = Depends(get_job_db)):
  """Return a list of all available jobs in the database."""
  try: 
    jobs = job_db.get_all_jobs()
    return {"status":"success", "job":jobs}
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
  
@router.get("/match-jobs")
async def match_job(
  resume_data: dict, 
  matching_service: JobMatchingService = Depends(get_job_matching_services),
  recommendation_service: JobMatchingService = Depends(get_job_recommendation_service)
):
  """Matching a resume against jobs and provides detailed recommendations. The input should be dictionary with the key 'resume_text' containing the enchanced resume text."""

  try:
    resume_text = resume_data.get("resume_text")
    if not resume_text:
      raise HTTPException(status_code=400, detail="Resume text is required in the request body.")
    
    #1. Get initial job matches 
    job_matches = await matching_service.match_resume_to_jobs(resume_text)

    #2. Get detailed recommendations for the top matches
    recommendations = await recommendation_service.get_recommendations( resume_text, job_matches)

    return {"status": "success", "recommendations":recommendations}
  
  except Exception as e:
    raise HTTPException(status_code=500, detail = str(e))