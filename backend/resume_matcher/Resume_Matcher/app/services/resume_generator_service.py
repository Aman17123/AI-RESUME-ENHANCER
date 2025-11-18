import io 
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from typing import Dict 
from docx.shared import RGBColor, Inches


class ResumeGeneratorService:
   """Generate a downloadable Word document from enchanced resume data."""
   
   def generate_resume_docx(self, enhanced_resume: Dict) -> io.BytesIO:
      """Create a Word document from the enchanced resume dictionary."""
      doc = Document()

      # Set default font 
      style = doc.styles["Normal"]
      font = style.font
      font.name = 'Calibari'
      font.size = Pt(11)

      # Add sections in order 
      self._add_personal_info(doc, enhanced_resume.get('personal_info'), {})

      if 'summary' in enhanced_resume and enhanced_resume['summary']:
         self._add_section(doc, "Professional Summary", enhanced_resume['summary'])
      
      if 'experience' in enhanced_resume and enhanced_resume['experience']:
         self._add_experience_section(doc, enhanced_resume['experience'])
      
      if 'education' in enhanced_resume and enhanced_resume['education']:
         self.add_education_section(doc, enhanced_resume['education'])

      if 'skills' in enhanced_resume and enhanced_resume['skills']:
         self._add_siklls_sections(doc, enhanced_resume['skills'])

      if 'achievements' in enhanced_resume and enhanced_resume['achievements']:
         self._add_achievements_sections(doc, enhanced_resume['achievements'])

      # Add a section for AI enhancement suggestions
      if 'enhancements' in enhanced_resume and enhanced_resume['enhancements']:
         self._add_enhancements_section(doc, enhanced_resume['enhancements'])

      # Save the document to an in-memory bytes buffer
      docx_bytes = io.BytesIO()
      doc.save(docx_bytes)
      docx_bytes.seek(0) # Rewind the buffer to the beginnig for reading

      return docx_bytes
   
   def _add_personal_info(self, doc:Document, personal_info:Dict):
      """Adds the name and contact information sections."""
      # Add name as a centered, blog, large heading
      name = personal_info.get('name','Your Name')
      p = doc.add_paragraph()
      p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
      run = p.add_run(name)
      run.font.size = Pt(16)
      run.bold = True

      # Add contact info, centered and samller
      contact_parts = []
      if 'email' in personal_info:
         contact_parts.append(personal_info['email'])
      if 'phone' in personal_info:
         contact_parts.append(personal_info['phone'])
      if 'location' in personal_info:
         contact_parts.append(personal_info['location'])

      if contact_parts:
         p = doc.add_paragraph()
         p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
         p.add_run(' | '.join(contact_parts))
         p.runs[0].font.size = Pt(10)

      # Add a horizontal line for visual sepration
      p = doc.add_paragraph()
      p.add_run("_"*50).font.italic = True

      # Add a blank paragraph for spacing 
      doc.add_paragraph()

   def _add_section(self, doc: Document, title: str, content: str):
      """Adds a generic section with a bold titke and content."""
      # Add section heading 
      p = doc.add_paragraph()
      run = p.add_run(title)
      run.bold = True
      run.font.size = Pt(12)

      # Add content
      if content:
         doc.add_paragraph(content)

      # Add a blank paragraph for spacing 
   
   def _add_experience_section(self, doc: Document, experiences: list[Dict]):
      """Adds the professional experience sectoin with details for each role."""
      # Add section heading 
      p = doc.add_paragraph()
      run = p.add_run("Professional Experience")
      run.bold = True
      run.font.size = Pt(12)

      # Add each experience entry
      for exp in experiences:
         # Add company and title on one line
         p = doc.add_paragraph()
         p.add_run(f"{exp.get('title', 'Title')} at {exp.get('company', 'Company')}").bold = True

         # Add duration on the next line, italicized
         if 'duration' in exp:
            p = doc.add_paragraph()
            p.add_run(exp['duration']).italic = True

         # Add description as a regular paragraph 
         if 'description' in exp:
            doc.add_paragraph(exp['description'])

         # Add a blank line between experiences
         doc.add_paragraph()

   def _add_education_section(self, doc: Document, education: list[Dict]):
      """Add the education section."""
      # Add section heading 
      p = doc.add_paragraph()
      run = p.add_run("Education")
      run.bold = True
      run.font.size = Pt(12)

      # Add each education entry
      for edu in education:
         # Add degree and institution on one line
         p = doc.add_paragraph()
         p.add_run(f"{edu.get('degree', 'Degree')} from {edu.get('institution', 'Institution')}").bold = True

         # Add years on the next line, italicized
         if 'years' in edu:
            p = doc.add_paragraph()
            p.add_run(edu['years']).italic = True

         # Add a blank line between entries
         doc.add_paragraph()
    
   def _add_skills_section(self, doc: Document, skills: list[str]):
      """Adds the skills sections as a comma-separated list."""
      # Add section heading 
      p = doc.add_paragraph()
      run = p.add_run("Skills")
      run.bold = True
      run.font.size = Pt(12)

      # Add skills as a single paragraph
      if isinstance(skills, list) and skills:
         skills_text = ', '.join(skills)
         doc.add_paragraph(skills_text)
      elif isinstance(skills, str):
         doc.add_paragraph(skills)

      # Add a blank pargraph for spacing 
      doc.add_paragraph()

   def _add_achievements_section(self, doc: Document, achievements: list[str]):
      """Adds the key achievements section as bullet points."""
      # Add a distinctive heading
      p = doc.add_paragraph()
      run = p.add_run("AI-Powered Enhancement Suggestions")
      run.bold = True
      run.font.size = Pt(12)

      # Add each achivement as a bullet point
      for achievement in achievements:
         p = doc.add_paragraph(achievement, style = 'List Bullet')

      # Add a blank paragraph for spacing 
      doc.add_paragraph()

   def _add_enhancements_section(self, doc: Document, enhancements: Dict):
      """Adds a section with AI-generated enhancement suggestions."""
      p = doc.add_paragraph()
      run = p.add_run("AI-Powered Enhancement Suggestions")
      run.bold = True
      run.font.size = Pt(12)
      run.font.color.rgb = RGBColor(0x42, 0x24, 0xE9) # A blue color to make it stand out 

      # Add enhancement suggestions
      if isinstance(enhancements.items()):
         for key, value in enhancements.items()
         # Format the key to be more readable
         formatted_key = key.replace('_',' ').title()

         p = doc.add_paragraph()
         p.add_run(f"{formatted_key}:").bold = True

         if isinstance(value, list):
            # If, value is a list, create bullet poionts
            for item in value:
               doc.add_paragraph(item, style = 'List Bullet', indent = Inches(0.25))
         elif isinstance(value, str):
            # If it's string, just add it as a paragraph 
            doc.add_paragraph(value, indent = Inches(0.23))

      # Add a concluding note for the user 
      p = doc.add_paragraph()
      run = p.add_run("Note: This section contains AI-generated suggestions to improve your resume. YOu can edit or remove this section before using your resume for job applications.")  
      run.italic = True 
      run.font.size = Pt(9)