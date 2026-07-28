import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { renderToString } from "react-dom/server";
import { getPDFTemplate } from "../components/PDFTemplates/PDFTemplateFactory";

export const downloadResumePDF = async (data, theme, templateLayout) => {
  let container;

  try {
    const TemplateComponent = getPDFTemplate(templateLayout);

    // 1️⃣ Create hidden container
    container = document.createElement("div");
    container.style.width = "210mm";
    container.style.backgroundColor = "#ffffff";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "-10000px";
    container.style.zIndex = "-1";

    // 🔥 IMPORTANT: mark as PDF export
    container.className = "pdf-export";

    document.body.appendChild(container);

    // 2️⃣ Inject PDF-safe CSS (kills lab/oklch)
    const style = document.createElement("style");
    style.innerHTML = `
      .pdf-export,
      .pdf-export * {
        color: rgb(0,0,0) !important;
        background-color: rgb(255,255,255) !important;
        border-color: rgb(0,0,0) !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
    `;
    container.appendChild(style);

    // 3️⃣ Render React → HTML
    container.innerHTML += renderToString(
      <TemplateComponent data={data} />
    );

    // 4️⃣ Wait for fonts/images
    await new Promise((r) => setTimeout(r, 800));

    // 5️⃣ html2canvas (SAFE MODE)
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: (doc) => {
        doc.querySelectorAll("*").forEach((el) => {
          const cs = getComputedStyle(el);

          if (cs.color?.includes("lab")) el.style.color = "#000";
          if (cs.backgroundColor?.includes("lab"))
            el.style.backgroundColor = "#fff";
          if (cs.borderColor?.includes("lab"))
            el.style.borderColor = "#000";
        });
      },
    });

    // 6️⃣ Cleanup
    document.body.removeChild(container);

    // 7️⃣ Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 8️⃣ Download
    pdf.save(`${data.name || "resume"}_${templateLayout}.pdf`);

    return true;
  } catch (err) {
    console.error("PDF generation failed:", err);
    if (container) document.body.removeChild(container);
    return false;
  }
};
