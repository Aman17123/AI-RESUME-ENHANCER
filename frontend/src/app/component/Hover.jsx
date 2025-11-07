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
    <section className="relative w-full py-20 bg-gradient-to-b from-[#e9f1fa] to-[#f3f7fc] text-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
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
