"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const resumes = [
  "https://i.pinimg.com/736x/8d/4f/88/8d4f88f5e3c5e88c1a6c26e4f0e4d1b7.jpg",
  "https://i.pinimg.com/736x/d9/b1/41/d9b14129bdf1d9e1d978b5b10a60a9f1.jpg",
  "https://i.pinimg.com/736x/65/ee/42/65ee42a24b1d42798636b13fae8f816e.jpg",
];

export default function ResumeSection() {
  return (
    <section className="relative w-full py-20  overflow-hidden">
      
      {/* === SVG MOVED AND POSITIONED ABSOLUTELY === */}
      <div className="absolute top-4 left-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="539"
          height="52"
          viewBox="0 0 539 52"
          fill="none"
        >
          <path
            d="M-6.99434 44.5989C-6.99434 44.5989 29.0445 -6.38692 53.4263 7.35251C69.4454 16.3795 49.0691 40.5334 67.4061 46.0054C87.2642 51.9312 87.6467 18.3735 108.811 17.9222C128.126 17.5104 131.275 36.7602 150.256 39.6932C177.599 43.9185 188.573 20.7984 216.184 17.9907C256.541 13.8868 276.156 38.4595 316.81 39.7993C356.352 41.1025 377.565 20.1477 416.563 25.593C436.634 28.3956 445.47 37.4413 465.611 39.8942C492.059 43.1151 508.759 41.625 533.665 33.8219"
            stroke="#6F90B7"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* === CONTENT CONTAINER === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* SVG was removed from here */}
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[18px] md:text-[20px] font-normal leading-relaxed text-gray-700 max-w-4xl mx-auto"
        >
          <span className="font-bold text-gray-900 text-[20px] md:text-[22px]">
            Lorem Ipsum
          </span>{" "}
          This is where the magic happens: our AI instantly analyzes your
          document, fixing common errors, optimizing keywords for ATS systems,
        </motion.h2>

        {/* Resume Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-20">
          {resumes.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative w-[260px] h-[380px] md:w-[280px] md:h-[400px] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-200 bg-white hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <Image
                src={src}
                alt={`Resume design ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}