import io
import re
import PyPDF2
import pdfplumber
from docx import Document

MAX_FILE_SIZE_MB = 10
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}


def parse_resume_file(file_content: bytes, filename: str, mime_type: str) -> str:
    """
    Safely parses a resume (PDF or DOCX) and returns cleaned text.
    Includes multiple fail-safes for real-world files.
    """

    # --- File size safety check ---
    if len(file_content) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise ValueError(f"File too large. Max allowed size is {MAX_FILE_SIZE_MB} MB.")

    # --- MIME type validation (not extension-based) ---
    if mime_type not in ALLOWED_MIME_TYPES:
        raise ValueError("Invalid file type. Only PDF and DOCX are allowed.")

    # --- File type routing ---
    if mime_type == "application/pdf":
        raw_text = _parse_pdf_safe(file_content)
    else:
        raw_text = _parse_docx_safe(file_content)

    if not raw_text or len(raw_text.strip()) < 20:
        # Less than 20 chars almost always means a scanned PDF or encoding issue
        raise ValueError("Unable to extract text. File may be scanned or corrupted.")

    return _clean_text(raw_text)


# PDF PARSING WITH FALLBACK
def _parse_pdf_safe(file_content: bytes) -> str:
    """
    Extract PDF text using PyPDF2 first, then fallback to pdfplumber.
    """
    text = ""

    # --- Attempt #1: PyPDF2 ---
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
    except Exception:
        text = ""

    # If PyPDF2 extracted too little text → fallback
    if len(text.strip()) < 20:
        try:
            with pdfplumber.open(io.BytesIO(file_content)) as pdf:
                pages_text = [page.extract_text() or "" for page in pdf.pages]
                text = "\n".join(pages_text)
        except Exception:
            pass

    return text


# DOCX PARSING WITH SAFETY
def _parse_docx_safe(file_content: bytes) -> str:
    """
    Extract text from DOCX safely (with corruption handling).
    """
    try:
        doc = Document(io.BytesIO(file_content))
        return "\n".join(p.text for p in doc.paragraphs)
    except Exception:
        raise ValueError("Unable to process DOCX. The file may be corrupted.")


# TEXT CLEANING
def _clean_text(text: str) -> str:
    """
    Cleans raw extracted resume text for consistent processing.
    """

    # Normalize spaces
    text = re.sub(r"[ \t]+", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Fix broken bullet points
    text = re.sub(r"•\s*", "• ", text)

    # Trim leading/trailing spaces
    text = text.strip()

    return text
