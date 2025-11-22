from pydantic import BaseModel, Field
from typing import List, Optional, Dict


# JOB MODEL
class JobModel(BaseModel):
    id: Optional[int] = Field(None, description="Job ID from database")

    title: str = Field(..., description="Job title")
    company: str = Field(..., description="Company name")
    location: Optional[str] = Field(None, description="Job location")

    description: str = Field(..., description="Full job description text")

    # Structured requirements instead of raw string
    requirements: Optional[List[str]] = Field(
        None, description="List of job requirements"
    )

    salary_range: Optional[str] = Field(None, description="Salary range")
    job_type: Optional[str] = Field(None, description="Full-time, Part-time, Contract")
    posted_date: Optional[str] = Field(None, description="Date job was posted")

    # Optional metadata for intelligent job matching
    skills: Optional[List[str]] = Field(
        None, description="Extracted skills from job description"
    )
    keywords: Optional[List[str]] = Field(
        None, description="Additional search or matching keywords"
    )
    seniority: Optional[str] = Field(
        None, description="Job seniority (Junior, Mid, Senior)"
    )


# JOB MATCH RESULT
class JobMatchResult(BaseModel):
    job: JobModel = Field(..., description="Job posting details")

    compatibility_score: float = Field(
        ..., ge=0, le=100, description="Overall job-resume match score (0-100)"
    )

    matched_skills: Optional[List[str]] = Field(
        None, description="Skills from resume that matched job requirements"
    )

    missing_skills: Optional[List[str]] = Field(
        None, description="Required job skills missing in resume"
    )

    # Additional scoring dimensions
    keyword_score: Optional[float] = Field(
        None, description="Keyword overlap score (0-100)"
    )
    experience_match_score: Optional[float] = Field(
        None, description="Experience relevance score (0-100)"
    )
    seniority_alignment: Optional[str] = Field(
        None, description="Comparison between job seniority and candidate level"
    )


# JOB INSIGHTS MODEL
class JobInsights(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]
    interview_prep: List[str]

    # Confidence level is better as text than float
    confidence_level: Optional[str] = Field(
        None, description="Confidence level (e.g., high, medium, low)"
    )

    additional_resources: Optional[List[Dict]] = Field(
        None, description="Recommended resources like courses or articles"
    )


# JOB RECOMMENDATION AGGREGATE
class JobRecommendation(BaseModel):
    job_match_results: List[JobMatchResult] = Field(
        ..., description="All job match results"
    )
    insights: JobInsights = Field(
        ..., description="Insights and recommendations for the candidate"
    )
