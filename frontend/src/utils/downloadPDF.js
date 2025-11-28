import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { getPDFTemplate } from '../components/PDFTemplates/PDFTemplateFactory';

export const downloadResumePDF = async (data, theme, templateLayout) => {
  try {
    // Get the appropriate template component
    const TemplateComponent = getPDFTemplate(templateLayout);
    
    // Create a container element to render our component
    const container = document.createElement('div');
    container.style.width = '210mm'; // A4 width
    container.style.padding = '0';
    container.style.backgroundColor = 'white';
    container.style.position = 'absolute';
    container.style.left = '-9999px'; // Move off-screen
    document.body.appendChild(container);

    // Render the component to the container
    const componentString = renderToString(
      <TemplateComponent data={data} />
    );
    container.innerHTML = componentString;

    // Wait for any images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: container.offsetWidth,
      height: container.offsetHeight,
      logging: false // Disable logging for cleaner console
    });

    // Remove the container
    document.body.removeChild(container);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF with template name in filename
    const fileName = `${data.name || 'resume'}_${templateLayout}.pdf`;
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};