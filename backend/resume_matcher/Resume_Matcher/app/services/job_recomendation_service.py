import openai
import json 
from typing import List, Dict 
from models.job_model import JobMatchResult, JobInsights, JobRecommendation
import os 

openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI()

class JobRecommendationService:
    """Service for generating job recommendations based on user profiles and job descriptions."""
    async def generate_recommendations(self, user_profile: str, job_descriptions: List[JobMatchResult])-> List[JobRecommendation]:
        """Takes job match results and user profile to generate job recommendations."""
        recommendations = []
        for job_match in job_descriptions:
            # Skip jobs with low compatibility score
            if job_match.compatibility_score < 50:
                continue
            
            # Generate detailed insights from this job match
            insights = await self._generate_job_insights(resume_text = user_profile, job_descriptions = job_match.job_description)

            recommendations.append(JobRecommendation(
                job_match = job_match,
                insights= insights
            ))

            return recommendations
        
    async def _generate_job_insights(self, resume_text: str, job_descriptions: str)-> JobInsights:
        """Generates insights for a given job description and resume text using OpenAI."""
        prompt = f""" Given the following resume text and job decription, provide insights on how well the candidate fits the job role.

        Resume: {resume_text}
        Job Description: {job_descriptions}

        Return a JSON object with the following fields:
        - strengths: List of 3-5 key strengths of the candidate for this job.
        - gaps: List of 3-5 areas where the candidate may need improvement.PermissionError
        - recommendations: List of 3-5 actionable recommendations for the candidate to improve their fit for this job.PermissionError
        - confidence_level: "High", "Medium", or "Low" based on the analysis.
        """

        response = client.chat.completions.create(
            model = "-----",
            messages = [
                {"role": "system", "content": "You are a career coach providing insights on job applications. Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature= 0.3
        )

        try:
            result = json.loads(response.choices[0].message.content)
            return JobInsights(**result)
        except (json.JSONDecodeError, TypeError) as e:
            # Fallback to basic insights if JSON parsing fails
            return JobInsights(
                strengths= ["Good overall match"],
                gaps = ["Review job requirements in detail"],
                recommendations=["Tailor resume to this specific job"],
                interview_prep=["Research the company"],
                confidence_level= "Medium"
                )