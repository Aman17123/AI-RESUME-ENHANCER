import { createRequire } from "module";
import mammoth from "mammoth";

// pdf-parse is CommonJS and has no proper ESM default export — load it via require.
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const MAX_CHARS = 30000;

export async function extractText(file, mimeType) {
  const buffer = Buffer.from(await file.arrayBuffer());
  let text = "";

  if (mimeType === "application/pdf") {
    const data = await pdfParse(buffer);
    text = data.text;
  } else {
    // DOCX (and .doc fallback through mammoth)
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  }

  text = (text || "").replace(/\s+/g, " ").trim();

  if (!text) {
    throw new Error(
      "No readable text found in this file. Scanned/image PDFs are not supported."
    );
  }

  return text.slice(0, MAX_CHARS);
}