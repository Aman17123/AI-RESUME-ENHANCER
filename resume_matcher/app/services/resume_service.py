import openai
from typing import Dict, List, Optional
import json 
import os 

openai.api_key = os.getenv("OPENAI_API_KEY")

class ResumeService:
  def __init__(self):
    self.client = openai.OpenAI()

  async def parse_resume(self, resume_text: str)-> Dict:
    """Parse resume text into structured format using OpenAI."""
    prompt = f"""Extract and structure the following resume into JSON format with these keys:
    - personal_info : name, email, phone, location 
    - summary : brief professional summary
    - experience : list of jobs with company, title, duration, and description 
    - education : list of degrees with institution, degree, and years 
    - skills : list of technical and soft skills
    - achievements : list of quantifiable achievements

    Resume text:{resume_text}

    Return only valid JSON:
    """

    response = self.client.chat.completions.create(
      model="gpt-4",
      messages=[
        {"role":"system", "content":"You are a resume parsing assistant. Extract information accurately and return only valid JSON."},
        {"role":"user", "content":prompt}
        ],
        temperature=0.1
    )

    try:
      result = json.loads(response.choices[0].message.content)
      return result
    except json.JSONDecodeError:
      # Fallback to basic parsing if JSON fails 
      return {"raw_text":resume_text}

  async def enhance_resume(self, structured_resume: Dict)-> Dict:
    """Enhance resume with action verbs, quantification, and keywords."""  
    prompt = f"""Enchance the following resume by:
    1. Replacing weak verbs with stronger action verbs
    2. Adding quantifiable metrics where possible
    3. Improving clarity and impact
    4. Suggesting additional keywords for the target role
    
    Resume data (JSON):{json.dumps(structured_resume)}
    
    Return the enhaced resume in the same JSON format, with an additional "enhancements" field explaining the changes made.
    """

    response = self.client.chat.completions.create(
      model = "gpt-4",
      messages=[
        {"role":"system", "content":"You are a resume enhancement expert. Improve resumes to make them more impactful for recruiters."},
        {"role":"user", "content":prompt}
      ],
      temperature=0.3
    )
    try :
      result = json.loads(response.choices[0].message.content)
      return result
    except json.JSONDecodeError:
      # Return original if enhancement fails
      return structured_resume