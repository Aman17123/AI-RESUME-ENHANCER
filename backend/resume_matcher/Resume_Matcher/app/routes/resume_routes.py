from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from services.resume_services import ResumeMatcherService
from utils.file_pracer import parse_file
from fastapi.responses import StreamingResponse
import io 

router = APIRouter()

# Dependency injection: FastAPI will provide an instance of the service
def get_resume_matcher_service():
    return ResumeMatcherService()

def get_resume_service():
    return ResumeMatcherService()

@router.post("/upload_resume")
async def upload_resume(
    file: UploadFile = File(...),
    resume_service: ResumeMatcherService = Depends(get_resume_service)
):
    """Accepts a resume file (PDF/DOCX), parses it, and stores the extracted text."""
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code = 400, detail = "Invalid file type. Only PDF and DOCX are supported.")
    
    try : 
        # 1. Get raw text from file
        resume_text = await parse_file(await file.read(), file.filename)

        # 2. Parse text to extract structured information
        structured_data = await resume_service.parse_resume_text(resume_text)

        # 3. Enhance structured resume data 
        enchanced_data = await resume_service.enhance_resume_data(structured_data)

        return {"status":"success", "data": enchanced_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail = str(e))
    
@router.post("/download_enhanced_resume")
async def download_enhanced_resume(
    resume_data: dict, 
    resume_generator: ResumeMatcherService = Depends(get_resume_matcher_service)
):
    """Generates and downloads the enhanced resume as a PDF file."""
    try:
        docx_bytes = await resume_generator.generate_resume_docx(resume_data)

        headers = {'Content-Disposition': 'attachment; filename=enhanced_resume.docx'}

        return StreamingResponse(
            io.BytesIO(docx_bytes.read()),
            media_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            headers=headers
        )
    except Exception as e:
        raise HTTPException(status_code = 500, detail=str(e))