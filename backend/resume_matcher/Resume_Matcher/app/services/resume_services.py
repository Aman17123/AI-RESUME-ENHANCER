import os
import json
from typing import Dict, Any

from openai import OpenAI
from pydantic import ValidationError

from app.models.resume_model import ResumeModel

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ResumeService:
    """Handles resume parsing and enhancement using OpenAI with safe guardrails."""

    # PARSE RESUME (STRUCTURE)
    async def parse_resume(self, resume_text: str) -> Dict:
        """Extracts structured data from raw resume text with strict JSON output."""

        prompt = f"""
You are a strict resume parsing engine. 
Your job is ONLY to extract factual information from the text. 
Never infer or invent missing details.

RULES:
- Do NOT fabricate companies, job titles, dates, or responsibilities.
- Do NOT assume missing information.
- If information is not present, return null or empty lists.
- Output STRICT JSON only.
- No explanations, no comments.

JSON FORMAT:
{{
  "personal_info": {{
      "name": null,
      "email": null,
      "phone": null,
      "linkedin": null,
      "github": null,
      "location": null
  }},
  "education": [],
  "experience": [],
  "skills": [],
  "certifications": [],
  "achievements": [],
  "projects": []
}}

Extract data from this resume:

--- RESUME TEXT ---
{resume_text}
"""

        response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "Return structured JSON only. No invented details."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        raw_output = response.choices[0].message.content.strip()

        try:
            structured_data = json.loads(raw_output)

            # Validate with Pydantic
            ResumeModel(**structured_data)

            return structured_data

        except (json.JSONDecodeError, ValidationError):
            return {
                "raw_text": resume_text,
                "error": "Failed to parse or validate structured JSON.",
                "llm_output": raw_output
            }

    # ENHANCE RESUME
    async def enhance_resume(self, structured_data: Dict) -> Dict:
        """Enhances resume safely and prevents hallucinations."""

        prompt = f"""
You are a resume enhancement engine. 
Improve clarity, impact, and relevance. 
Rewrite ONLY existing information. Do NOT invent new positions, dates, degrees, or skills.

RULES:
- Improve writing quality.
- Make bullet points action-oriented.
- Add quantification ONLY if implied in original text.
- Do NOT fabricate achievements.
- Do NOT modify facts.
- Add an `enhancements` list describing what was improved.

Return STRICT JSON in the SAME structure as input.

INPUT JSON:
{json.dumps(structured_data, indent=2)}
"""

        response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "Improve resumes without inventing information."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        raw_output = response.choices[0].message.content.strip()

        try:
            enhanced_data = json.loads(raw_output)

            # Validate structure
            ResumeModel(**enhanced_data)

            return enhanced_data

        except (json.JSONDecodeError, ValidationError):
            return {
                "original": structured_data,
                "llm_output": raw_output,
                "error": "Failed to parse enhanced JSON. Returning original."
            }