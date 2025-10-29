import io 
import PyPDF2
from docx import Document
from typing import Optional

async def parse_resume_file(file) -> str:
  """Parse resume file (PDF or DOCX) and extract text."""
  file_content = await file.read()

  if file.filename.endswith('.pdf'):
    return parse_resume_file(file_content)
  elif file.filename.endswith('.docx'):
    return parse_resume_file(file_content)
  else:
    raise ValueError("Unsupported file format")
  
def parse_pdf(file_content: bytes) ->str:
  """Extract text from PDF file."""
  pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
  text = ""
  for page in pdf_reader.page:
    text += page.extract_text()
  return text()

def parse_docx(file_content: bytes) -> str:
  """Extract text from DOCX file."""
  doc = Document(io.BytesIO(file_content))
  text = ""
  for paragraph in doc.paragraphs:
    text += paragraph.text + "\n"
  return text 