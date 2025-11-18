import openai
import json
import os
from typing import List, Dict
from database.job_db import JobDB
from models.job_model import JobModel, JobMatchResult

openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI()

class JobMatchingService:
  """Service to match resumes with job posting using OpenAI's"""

  def __init__(self):
    self.job_db = JobDB()

  async def match_resume_to_jobs(self, resume_text: str, limit: int = 10) -> List[JobMatchResult]:
    """Match a resume against job postings in the database and return the top matches. (Note: This is the non-vector database approach for simplicity)."""
    job_descriptions = self.job_db.get_all_jobs(limit= 100) # Fetch a larger pool to match from 
    matches = []

    for job_dict in job_descriptions:
      job = JobModel(**job_dict)

      # Calculate compatibility score using OpenAI
      analysis = await self._calculate_compatibility(resume_text, job.description)
      compatibility_score = analysis.get("compatibility_score", 0.0)

      # Only include jobs with a decent compatibility score
      if compatibility_score >= 40.0:
        matches.append(JobMatchResult(
          job= job,
          compatibility_score= compatibility_score,matched_skills = analysis.get("matched_skills", []), missing_skills = analysis.get("missing_skills", [])
          ))
        
    # Sort matches by compatibility score in descending order 
    matches.sort(key=lambda x: x.compatibility_score, reverse=True)

    return matches[:limit]
  
  async def _calculate_compatibility(self, resume_text: str, job_description: str) -> Dict:
    """Use OpenAI to perform a deep analysis of the resume against the job description and return a compatibility score and matched/missing skills."""
    prompt = f"""Analyze the following resume and job description. Provide a compatibility score between 0 and 100, a list of skills from the resume that match the job requirements, and a list of skills required by the job that are missing in the resume.
    
    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Return a JSON object with the following structure:
    - overall_compatibility_score: a number from 0 to 100 representing overall compatibility
    - matched_skills: a list of skills from the resume that match the job requirements
    - missing_skills: a list of skills required by the job that are missing in the resume
    """

    response = await client.chat.completions.create(
      model="----",
      messages=[
        {"role": "system", "content": "You are an expert at matching candidates to job descriptions. Analyze compatibility based on return  only the requested JSON structure."},
        {"role": "user", "content": prompt}
      ],
      temperature=0.1,
    )

    try:
      return json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
      return {
        "compatibility_score": 0.0,
        "matched_skills": [],
        "missing_skills": []
      }