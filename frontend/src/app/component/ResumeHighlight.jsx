"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "../globals.css";

export default function ResumeHighlight() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white pb-24">
      {/* ===== Top Wave ===== */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 150"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[120px] md:h-[150px] -mt-[1px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 L480,40 L960,130 L1440,60 L1440,0 L0,0 Z"
            fill="#F6FAFF"
          />
        </svg>
      </div>

      {/* ===== Content Wrapper ===== */}
      <div className="relative max-w-6xl mx-auto flex  flex-col min-h-[70vh] items-center px-6 md:px-8 mt-20">
        {/* Title - now LEFT aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold mt-5 josefin-sans mb-16 w-full text-left"
        >
          <span className="text-[#4da3ff] underline josefin-sans">Lorem Ipsum</span>  is simply<br/> dummy
        </motion.h2>

        {/* ===== Image + Callouts Container ===== */}
        <div className="relative flex justify-center items-center mt-10">
          {/* ===== Center Image ===== */}
          <div className="relative w-[260px] sm:w-[320px] md:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white z-10">
            <Image
              src="https://i.pinimg.com/1200x/48/7c/13/487c13a9ed77a264ff9193f61c9261de.jpg"
              alt="Resume Highlight Example"
              fill
              quality={100}
              className="object-cover"
            />
          </div>

          {/* === Top Right === */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute hidden md:flex flex-col items-start right-[440px] top-[22%]"
          >
            <svg
              width="200"
              height="90"
              viewBox="0 0 200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* curve goes OUT from image toward the dot */}
              <path
                d="M200,10 Q100,60 0,80"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="0" cy="80" r="4" fill="#E5E7EB" />
            </svg>
            <p className="mt-3 text-sm text-gray-200 whitespace-nowrap pl-2">
              Professional Summary
            </p>
          </motion.div>

          {/* === Bottom Right === */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute hidden md:flex flex-col items-start right-[440px] bottom-[22%]"
          >
            <svg
              width="200"
              height="90"
              viewBox="0 0 200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M200,80 Q100,40 0,10"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="0" cy="10" r="4" fill="#E5E7EB" />
            </svg>
            <p className="mt-3 text-sm text-gray-200 whitespace-nowrap pl-2">
              Experience Highlights
            </p>
          </motion.div>

          {/* === Top Left === */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute hidden md:flex flex-col items-end left-[440px] top-[22%]"
          >
            <svg
              width="200"
              height="90"
              viewBox="0 0 200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,10 Q100,60 200,80"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="200" cy="80" r="4" fill="#E5E7EB" />
            </svg>
            <p className="mt-3 text-sm text-gray-200 whitespace-nowrap text-right pr-2">
              Key Skills
            </p>
          </motion.div>

          {/* === Bottom Left === */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute hidden md:flex flex-col items-end left-[440px] bottom-[22%]"
          >
            <svg
              width="200"
              height="90"
              viewBox="0 0 200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,80 Q100,40 200,10"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="200" cy="10" r="4" fill="#E5E7EB" />
            </svg>
            <p className="mt-3 text-sm text-gray-200 whitespace-nowrap text-right pr-2">
              Education
            </p>
          </motion.div>
        </div>


        {/* Bottom Caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-16 text-sm max-w-md mx-auto text-center"
        >
          Text of the printing and typesetting industry.
        </motion.p>
      </div>
    </section>
  );
}
