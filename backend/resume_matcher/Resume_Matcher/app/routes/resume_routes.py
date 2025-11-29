from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi.responses import StreamingResponse
import io

from app.services.resume_generator_service import ResumeGeneratorService
from app.services.resume_document_service import ResumeDocumentService
from app.utils.file_parser import parse_resume_file

router = APIRouter()


# Dependency providers
def get_resume_generator_service():
    return ResumeGeneratorService()

def get_resume_document_service():
    return ResumeDocumentService()


# UPLOAD + PARSE + ENHANCE RESUME
@router.post("/upload_resume")
async def upload_resume(
    file: UploadFile = File(...),
    resume_service: ResumeGeneratorService = Depends(get_resume_generator_service)
):
    """Upload a resume (PDF/DOCX), extract text, parse it, and enhance it."""
    
    # Validate file extension
    if not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX are supported.")

    try:
        # Read file
        file_bytes = await file.read()

        # Extract raw text
        resume_text = parse_resume_file(file_bytes, file.filename)

        # Parse into structured JSON
        structured_data = await resume_service.parse_resume(resume_text)

        # Enhance structured data
        enhanced_data = await resume_service.enhance_resume(structured_data)

        return {
            "status": "success",
            "data": enhanced_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume processing failed: {str(e)}")


# DOWNLOAD ENHANCED RESUME AS DOCX
@router.post("/download_enhanced_resume")
async def download_enhanced_resume(
    resume_data: dict,
    resume_doc_service: ResumeDocumentService = Depends(get_resume_document_service)
):
    """Generate and stream downloadable DOCX résumé."""
    
    try:
        docx_buffer = resume_doc_service.generate_docx(resume_data)

        headers = {"Content-Disposition": "attachment; filename=enhanced_resume.docx"}

        # StreamingResponse accepts BytesIO directly
        return StreamingResponse(
            docx_buffer,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers=headers
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document generation failed: {str(e)}")
