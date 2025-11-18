import sqlite3
from typing import List, Tuple, Optional, Dict

class JobDB:
  """A simple class to manage job interaction with a SQLite job database, including adding, retrieving, and deleting job postings, as well as searching for jobs based on keywords."""

  def __init__(self, db_path:str = "app/database/jobs.db"):
    self.db_path = db_path
    self.__init__db()

  def __init__db(self):
    """Initialize the database and create the jobs table if it doesn't exist."""
    conn = sqlite3.connect(self.db_path)
    cursor = conn.cursor()

    cursor.execute("""
      CREATE TABLE IF NOT EXISTS jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT,
        requirements TEXT,
        salary_range TEXT,
        job_type TEXT,
        posted_date TEXT
      )
      """)
    
    # Check if we have data, and if not, populate with sample data
    cursor.execute("SELECT COUNT(*) FROM jobs")
    if cursor.fetchone()[0] == 0:
      self.__add_sample_data(cursor)
    conn.commit()
    conn.close()

  def __add_sample_data(self, cursor):
    """Add a few sample job postings to the database."""
    sample_job = [
      {
        "title": "Senior Data Scientist",
        "company": "Tech Innovation Inc.",
        "location": "Dehradun, India",
        "description": "We are looking for a Senior Data Scientist to lead our team. You will be responsible for developing machine learning models, analyzing complex datasets, and providing insights to drive business decisions.",
        "requirements": "PhD in computer science, Statistics, or related field, 5+ years of experience in data science. Strong programming skills in Python and R. Experience with big data technologies such as Hadoop and Spark, deep understanding of machine learning algorithms and deep learning frameworks.",
        "salary_range": "₹1,15,00,000 - ₹1,50,00,000",
        "job_type": "Full-time",
        "posted_date": "2025-11-11"
      },
      {
        "title": "Product Manager",
        "company": "Creative Solution Ltd.",
        "location": "Delhi, India",
        "description": "We are seeking a Product Manager to oversee the development and launch of new products. You will work closely with cross-functional teams to define product vision, gather requirements, and ensure successful delivery.",
        "requirements": "Bachelor's degree in Business, Marketing, or related field. 4+ years of experience in product management. Strong leadership and communication skills. Ability to work in a fast-paced environment and manage multiple projects simultaneously.",
        "salary_range": "₹90,00,000 - ₹1,20,00,000",
        "job_type": "Full-time",
        "posted_date": "2025-11-10"
      }
    ]

    for job in sample_job:
      cursor.execute("""
        INSERT INTO jobs (title, description, company, location, requirements, salary_range, job_type, posted_date)
        VALUES(? , ?, ?, ?, ?, ?, ?, ?)
        """, (
              job['title'],
              job['description'],
              job['company'],
              job['location'],
              job['requirements'],
              job['salary_range'],
              job['job_type'],
              job['posted_date']
              ))
      
  def get_all_jobs(self, limit: int =100)-> List[Dict]:
    """Retrieve all job postings from the database, limited to a specified number."""
    conn = sqlite3.connect(self.db_path)
    conn.row_factory = sqlite3.Row # This allows us to access columns by name
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM jobs ORDER BY posted_date DESC LIMIT {limit}")
    rows = cursor.fetchall()
    jobs = [dict(row) for row in rows]
    conn.close()
    return jobs