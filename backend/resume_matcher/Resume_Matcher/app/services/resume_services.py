import openai
import json
import os
from typing import List, Dict 
from models.resume_model import Resume

openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI()

class ResumeService:
    """Handles resume parsing and enhancement using OpenAI."""
    async def parse_resume(self, resume_text: str) -> Dict:
        """Uses OpenAI to structure resume text into a JSON format."""
        prompt = f"""Extract the following resume text into a structured JSON format with these keys:
        - personal_info: name, email, phone, location
        - experience: list of jobs with company, title, 
        duration, responsibilities
        - education: list of degrees with institution,
        degree, graduation_year
        - skills: list of techinical and soft skills
        - achievements: list of quantifiable achievements

        Resume Text:
        {resume_text}

        Return the JSON object only.
        """

        response = await client.chat.completions.create(
            model = "----",
            messages=[
                {'role': 'system', 'content': 'You are a resume parsing assistant. Extract information accurately and return only JSON.'},
                {'role': 'user', 'content': prompt}
            ],
            temperature=0.2,
        )

        try:
            structured_data = json.loads(response.choices[0].message.content)
            return structured_data
        except json.JSONDecodeError:
            # Fallback in case of parsing error 
            return {"raw_text": resume_text, "error": "Failed to parse JSON."}
        
    async def enhance_resume(self, structured_data: Dict)-> Dict:
        """Enhances the structured resume in the same JSON format, with an additional "enhancements" field explaining the changes made as a list of strings."""

        response = await client.chat.completions.create(
            model = "----",
            messages=[
                {'role': 'system', 'content': 'You are a resume enhancement expert. Improve the resume to make it more impactful for recruiters.'},
                {'role': 'user', 'content': prompt}
            ],
            temperature=0.2,
        )
        try:
            enhanced_data = json.loads(response.choices[0].message.content)
            return enhanced_data
        except json.JSONDecodeError:
            # Return original data if parsing fails
            return structured_data