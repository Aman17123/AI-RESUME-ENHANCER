"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../_component/Navbar";
import Footer from "../_component/Footer";

export default function Landing() {
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const valid = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!valid.includes(file.type)) {
      window.location.href = "https://www.youtube.com/watch?v=VMnEy0jbb0U";
      return;
    }

    setFileName(file.name);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
    <Navbar logoColor="#ffffff" buttonColor="#0000ff" scrollBgColor="#000000"/>
    <div
      className="h-[86vh] flex items-center justify-center p-6"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,1) 100%),
          radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,1) 70%)
        `,
        backgroundColor: "#000"
      }} >
      
          <div className="w-full max-w-5xl border josefin-sans border-black rounded-[40px] p-12 relative overflow-hidden  bg-white/10 backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Stop Applying. Start <span className="underline">Getting Hired.</span>
        </h1>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Our AI instantly scans, optimizes, and tailors your resume to beat the ATS and match the job description every time.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-[400px] h-[220px] rounded-2xl bg-gray-100 border border-gray-400 flex flex-col items-center justify-center gap-3"
        >
          <label className="px-6 py-3 bg-black text-white rounded-md shadow cursor-pointer transition transform hover:scale-105 hover:bg-gray-700">
            Upload Your Resume
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
          </label>

          {loading && <p className="text-sm text-blue-600">Uploading...</p>}

          {!loading && fileName && <p className="text-sm text-gray-800">Selected: {fileName}</p>}

          <p className="text-xs font-bold text-gray-600">**PDF or DOCX only**</p>
        </motion.div>
        
      </div>
      
    </div>
      <Footer/>
    </>
    
  );
}
