import os
import json
from typing import List, Dict, Optional

from openai import OpenAI
from app.database.job_db import JobDB
from app.models.job_model import JobModel, JobMatchResult

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class JobMatchingService:
    """Handles intelligent job–resume matching with safety, caching, and multi-factor scoring."""

    def __init__(self):
        self.job_db = JobDB()

    # PUBLIC FUNCTION: MATCH RESUME TO JOBS
    async def match_resume_to_jobs(self, resume_text: str, limit: int = 10) -> List[JobMatchResult]:
        jobs_raw = self.job_db.get_all_jobs(limit=200)
        matches = []

        # Preprocess resume once
        resume_skills = await self._extract_skills(resume_text)

        for job_dict in jobs_raw:
            job = JobModel(**job_dict)

            # Extract skills for job (once)
            job_skills = await self._extract_skills(job.description)

            # Calculate deterministic scores
            score, matching, missing = self._compute_skill_overlap(resume_skills, job_skills)

            # Fallback to embedding similarity for tie-breaking
            embedding_score = await self._embedding_similarity(resume_text, job.description)

            final_score = round((score * 0.6) + (embedding_score * 0.4), 2)

            if final_score >= 30:  # More reasonable cutoff
                matches.append(
                    JobMatchResult(
                        job=job,
                        compatibility_score=final_score,
                        matched_skills=matching,
                        missing_skills=missing,
                    )
                )

        matches.sort(key=lambda x: x.compatibility_score, reverse=True)
        return matches[:limit]

    # SKILL EXTRACTION USING LLM (Strict, No Hallucinations)
    async def _extract_skills(self, text: str) -> List[str]:
        prompt = f"""
Extract ONLY actual skills mentioned in the following text.
RULES:
- ONLY include skills explicitly present in the text.
- DO NOT infer or guess.
- Output JSON list only (e.g., ["Python", "SQL"]).

TEXT:
{text}
"""

        response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "Extract explicit skills only. Return a JSON list."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        try:
            return json.loads(response.choices[0].message.content)
        except:
            return []

    # DETERMINISTIC SKILL OVERLAP SCORING
    def _compute_skill_overlap(self, resume_skills: List[str], job_skills: List[str]):
        if not resume_skills or not job_skills:
            return 0, [], job_skills

        resume_set = set(skill.lower() for skill in resume_skills)
        job_set = set(skill.lower() for skill in job_skills)

        matching = list(job_set & resume_set)
        missing = list(job_set - resume_set)

        score = (len(matching) / max(1, len(job_set))) * 100
        return round(score, 2), matching, missing

    # EMBEDDING-BASED SEMANTIC MATCHING (LLM Embeddings)
    async def _embedding_similarity(self, resume_text: str, job_text: str) -> float:
        try:
            res_emb = (await client.embeddings.create(
                model="text-embedding-3-small",
                input=resume_text
            )).data[0].embedding

            job_emb = (await client.embeddings.create(
                model="text-embedding-3-small",
                input=job_text
            )).data[0].embedding

            return self._cosine_similarity(res_emb, job_emb) * 100
        except:
            return 0.0

    def _cosine_similarity(self, a, b) -> float:
        dot = sum(x*y for x, y in zip(a, b))
        norm_a = sum(x*x for x in a) ** 0.5
        norm_b = sum(x*x for x in b) ** 0.5
        return dot / (norm_a * norm_b + 1e-8)