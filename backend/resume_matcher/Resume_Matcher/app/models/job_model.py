from pydantic import BaseModel, Field
from typing import List, Optional, Dict 

class JobModel(BaseModel):
    title: str = Field(..., description="Job title")
    company: str = Field(..., description="Company offering the job")
    location: Optional[str] = Field(None, description="Location of the job")
    description: str = Field(..., description="Detailed job description")
    requirements: Optional[str] = Field(None, description="Job requirements and qualifications")
    salary_range: Optional[str] = Field(None, description="Salary range for the job")
    requirements: Optional[str] = Field(None, description="Job requirements and qualifications")
    salary_range: Optional[str] = Field(None, description="Salary range for the job")
    job_type: Optional[str] = Field(None, description="Type of job (e.g., Full-time, Part-time, Contract)")
    posted_date: Optional[str] = Field(None, description="Date when the job was posted")

class JobMatchResult(BaseModel):
    job: JobModel = Field(..., description="The job posting details")
    compatibility_score: float = Field(..., description="Compatibility score between the resume and the job posting")
    matched_skills: List[str] = Field(..., description= "List of skills from the resume that matched the job requirements")
    missing_skills: List[str] = Field(..., description="List of skills required by the job that are missing in the resume")

class JobInsights(BaseModel):
    strengths: List[str] = Field(..., description="List of strengths identified in the resume relevant to the job")
    weaknesses: List[str] = Field(..., description="List of weaknesses or gaps in the resume relevant to the job")
    recommendations: List[str] = Field(..., description="Recommendations for improving the resume to better match the job")
    interview_prep: List[str] = Field(..., description="Tips and topics for interview preparation based on the job requirements")
    confidence_level: float = Field(..., description = "Confidence level of the insights provided")
    additional_resources: Optional[List[Dict]] = Field(None, description="Additional resources such as articles or courses to help improve the resume")

class JobRecommendation(BaseModel):
    job_match_results: List[JobMatchResult]= Field(..., description="List of job match results")
    insights: JobInsights = Field(..., description="Insights and recommendations for the candidate")