from pydantic import BaseModel, Field 
from typing import List, Optional, Dict 

class PresonalInfo(BaseModel):
    name: str = Field(..., description="Full name of the candidate")
    email: str = Field(..., description="Email address of the candidate")
    phone: Optional[str] = Field(None, description = "Phone number of the candidate")
    linkedin: Optional[str]=Field(None, description = "LinkedIn profile URL of the candidate")
    github: Optional[str] = Field(None, description= "GitHub profile URL of the candidate")
    location: Optional[str]= Field(None, description="Location of the candidate")

class EducationEntry(BaseModel):
    institution: str = Field(..., description="Name of the educational institution")
    degree: str = Field(..., description="Degree obtained")
    field_of_study: str = Field(..., description="Field of study")
    year_of_completion: Optional[int]= Field(None, description="Year of completion")
    gpa: Optional[float]= Field(None, description= "GPA or percentage")

class ResumeModel(BaseModel):
    personal_info: PresonalInfo = Field(..., description="Personal information of the candidate")
    education : List[EducationEntry] = Field(..., description="List of educational qualifications")
    experience: List[Dict] = Field(..., description="List of work experiences")
    skills: List[str] = Field(..., description = "List of skills")
    certifications: Optional[List[Dict]] = Field(None, description="List of certifications")
    achievements: Optional[List[str]]= Field(None, description="List of achievements")
    projects: Optional[List[Dict]] = Field(None, description="List of projects undertaken")
    # Optional sections can be added as needed
    raw_text: Optional[str] = Field(None, description="Raw text of the resume for reference")
    enhancemets: Optional[Dict]= Field(None, description="Enhancements suggestions for the resume")