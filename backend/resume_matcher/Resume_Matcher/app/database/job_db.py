import sqlite3
from typing import List, Dict, Optional


DB_PATH = "app/database/jobs.db"


class JobDB:
    """Production-safe Job Database wrapper (SQLite for MVP)."""

    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._init_db()

    # DATABASE INITIALIZATION
    def _init_db(self):
        """Initializes tables and indexes if not existing."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                company TEXT NOT NULL,
                location TEXT,
                description TEXT NOT NULL,
                requirements TEXT,
                skills TEXT,
                keywords TEXT,
                seniority TEXT,
                job_type TEXT,
                salary_range TEXT,
                posted_date TEXT
            )
            """)

            # Indexes for fast search/filter
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_title ON jobs(title)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_company ON jobs(company)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_posted_date ON jobs(posted_date DESC)")

            conn.commit()

    # JOB INSERTION
    def add_job(self, job_data: Dict) -> int:
        """Adds a job record. Returns job ID."""
        required_fields = ["title", "company", "description"]
        if any(f not in job_data for f in required_fields):
            raise ValueError("Missing required fields: title, company, description")

        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()

            cursor.execute("""
            INSERT INTO jobs 
            (title, company, location, description, requirements, skills, keywords, seniority, job_type, salary_range, posted_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                job_data.get("title"),
                job_data.get("company"),
                job_data.get("location"),
                job_data.get("description"),
                job_data.get("requirements"),
                job_data.get("skills"),
                job_data.get("keywords"),
                job_data.get("seniority"),
                job_data.get("job_type"),
                job_data.get("salary_range"),
                job_data.get("posted_date")
            ))

            conn.commit()
            return cursor.lastrowid

    # FETCH ALL JOBS
    def get_all_jobs(self, limit: int = 100) -> List[Dict]:
        """Retrieve all jobs ordered by posted_date (DESC)."""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            cursor.execute(
                "SELECT * FROM jobs ORDER BY posted_date DESC LIMIT ?", 
                (limit,)
            )

            rows = cursor.fetchall()
            return [dict(row) for row in rows]

    # GET JOB BY ID
    def get_job_by_id(self, job_id: int) -> Optional[Dict]:
        """Fetch a job by its ID."""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
            row = cursor.fetchone()

            return dict(row) if row else None

    # DELETE JOB
    def delete_job(self, job_id: int) -> bool:
        """Delete a job. Returns True if a row was deleted."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
            conn.commit()
            return cursor.rowcount > 0

    # SEARCH JOBS (Basic text search)
    def search_jobs(self, query: str, limit: int = 50) -> List[Dict]:
        """
        Basic keyword search in title, description, and skills.
        NOTE: SQLite LIKE is limited; upgrade to FTS table later.
        """
        like_query = f"%{query.lower()}%"

        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            cursor.execute("""
            SELECT * FROM jobs
            WHERE LOWER(title) LIKE ?
               OR LOWER(description) LIKE ?
               OR LOWER(skills) LIKE ?
            ORDER BY posted_date DESC
            LIMIT ?
            """, (like_query, like_query, like_query, limit))

            rows = cursor.fetchall()
            return [dict(row) for row in rows]