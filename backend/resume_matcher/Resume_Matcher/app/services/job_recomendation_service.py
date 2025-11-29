import os
import json
from typing import List

from openai import OpenAI
from app.models.job_model import JobMatchResult, JobInsights, JobRecommendation

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class JobRecommendationService:
    """Generates safe, structured job recommendations using LLM insights."""

    async def generate_recommendations(
        self,
        resume_text: str,
        job_matches: List[JobMatchResult],
        limit: int = 5
    ) -> List[JobRecommendation]:

        recommendations = []

        # Sort by compatibility score before filtering
        job_matches_sorted = sorted(
            job_matches,
            key=lambda x: x.compatibility_score,
            reverse=True
        )

        # Only take strong matches
        strong_matches = [
            jm for jm in job_matches_sorted if jm.compatibility_score >= 50
        ]

        for job_match in strong_matches[:limit]:
            job_desc = job_match.job.description

            insights = await self._generate_job_insights(
                resume_text=resume_text,
                job_description=job_desc
            )

            recommendations.append(
                JobRecommendation(
                    job_match_results=[job_match],
                    insights=insights
                )
            )

        return recommendations

    #   INSIGHT GENERATION WITH STRICT JSON + HALLUCINATION GUARDRAILS
    async def _generate_job_insights(self, resume_text: str, job_description: str) -> JobInsights:

        prompt = f"""
You are a career advisor. 
Analyze the resume and job description and produce structured, factual insights.

STRICT RULES:
- DO NOT fabricate strengths or weaknesses not supported by resume text.
- DO NOT guess missing experience or skills.
- ONLY base insights on explicit facts from the resume.
- Avoid subjective or exaggerated language.
- Output STRICT JSON only.

REQUIRED JSON FORMAT:
{{
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "interview_prep": [],
  "confidence_level": "High | Medium | Low",
  "additional_resources": []
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}
"""

        response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You must analyze job fit and return ONLY valid JSON following the schema."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        raw_output = response.choices[0].message.content.strip()

        try:
            data = json.loads(raw_output)
            return JobInsights(**data)
        except:
            # Safe fallback if JSON parsing fails
            return JobInsights(
                strengths=["Strong match based on experience and skills"],
                weaknesses=["Resume needs better alignment with job description"],
                recommendations=["Highlight job-relevant skills more clearly"],
                interview_prep=["Review key responsibilities and prepare examples"],
                confidence_level="Medium",
                additional_resources=[]
            )