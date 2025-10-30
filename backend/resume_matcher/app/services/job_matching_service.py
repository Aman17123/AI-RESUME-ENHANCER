import openai
from typing import List, Dict, Tuple
import json 
import os 
from database.job_db import JobDB

openai.api_key = os.getenv("OPENAI_API_KEY")

class JobMatchingService:
  def __init__(self):
    self.client = openai.OpenAI()
    self.job_db = JobDB()

  async def match_resume_to_jobs(self, resume_text: str, limit: int = 10)-> List[Dict]:
    """Match resume agaist job descriptions and return compatibility scores."""
    # Get job description from database
    job_descriptions = self.job_db.get_all_jobs(limit=100) # Get more jobs to find best matches 

    matches = []

    for job in job_descriptions:
      # Calculate compatibility score using OpenAI
      score = await self._calculate_compatibility(resume_text, job["description"])

      matches.append({
        "job_id": job["id"],
        "title": job["title"],
        "company": job["company"],
        "location": job["location"],
        "description": job["description"],
        "compatiblity_score": score
      })

      # Sort by compatibility score(descending)
      matches.sort(key=lambda x:x["compatibility_score"], reverse = True)

      return matches[:limit] # Return top matches

  async def _calculate_compatibility(self, resume_text: str, job_description: str) -> float:
    """Calculate compatibility score between resume and job description."""
    prompt = f"""Analyze the compatibility between the following resume and job description.
    Consider skills, experience level, qualifications, and overall fit.
    
    Resume:{resume_text}
    
    Job Description:{job_description}
    """  
