"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import cursor from "../../../public/cursor.png";
import "../globals.css";

export default function ResumeHighlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 40 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#0a0a0a] text-white pb-24 transition-all duration-300 ${
        isInside ? "cursor-none" : "cursor-auto"
      }`}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
    >
      {/* ===== Custom Cursor ===== */}
      {isInside && (
        <motion.div
          style={{
            translateX: smoothX,
            translateY: smoothY,
          }}
          className="fixed top-0 left-0 z-50 pointer-events-none w-12 h-12"
        >
          <Image
            src={cursor}
            alt="custom magnifier cursor"
            width={58}
            height={58}
            className="object-contain"
          />
        </motion.div>
      )}

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
      <div className="relative max-w-6xl mx-auto flex flex-col min-h-[70vh] items-center px-6 md:px-8 mt-20">
        {/* ===== Title ===== */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold mt-5 josefin-sans mb-16 text-center md:text-left w-full"
        >
          <span className="text-[#4da3ff] underline josefin-sans">
            Lorem Ipsum
          </span>{" "}
          is simply
          <br /> dummy
        </motion.h2>

        {/* ===== Image + Callouts ===== */}
        <div className="relative flex justify-center items-center mt-10">
          {/* ===== Center Image ===== */}
          <div className="relative w-[240px] sm:w-[300px] md:w-[380px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border-[2px] border-white/80 bg-white z-10">
            <Image
              src="https://i.pinimg.com/1200x/48/7c/13/487c13a9ed77a264ff9193f61c9261de.jpg"
              alt="Resume Highlight Example"
              fill
              quality={100}
              className="object-cover"
            />
          </div>

          {/* ===== Desktop Lines (md+) ===== */}
          {/* TOP RIGHT */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="absolute hidden md:flex items-center gap-1 right-[353px] top-[14%]"
          >
            <p className="text-m text-gray-100 josefin-sans whitespace-nowrap">
              Creative Direction
            </p>
            <svg
              className="relative z-10"
              width="320"
              height="110"
              viewBox="0 0 30 170"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M222 161C143 145 65 130 0 40"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="0" cy="40" r="8" fill="#ffffff" />
            </svg>
          </motion.div>

          {/* TOP LEFT */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="absolute hidden md:flex items-center gap-2 left-[320px] top-[14%]"
          >
            <svg
              width="280"
              height="140"
              viewBox="0 0 280 140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,120 C80,80 160,60 260,40"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="260" cy="40" r="8" fill="#ffffff" />
            </svg>
            <p className="text-base font-medium text-gray-100 josefin-sans whitespace-nowrap text-right -ml-2">
              UI/UX Design
            </p>
          </motion.div>

          {/* BOTTOM RIGHT */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="absolute hidden md:flex items-center gap-3 right-[320px] bottom-[22%]"
          >
            <p className="text-m josefin-sans text-gray-100 whitespace-nowrap">
              Development
            </p>
            <svg
              width="280"
              height="160"
              viewBox="0 0 280 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="20" r="8" fill="#ffffff" />
              <path
                d="M10 20 C40 60, 100 100, 260 140"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* BOTTOM LEFT */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="absolute hidden md:flex items-center gap-2 left-[320px] bottom-[22%]"
          >
            <svg
              width="280"
              height="160"
              viewBox="0 0 280 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 271C-9-4 154 19 183 117 C192 145 210 160 260 60"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="260" cy="60" r="8" fill="#ffffff" />
            </svg>
            <p className="text-base font-medium text-gray-100 josefin-sans whitespace-nowrap text-right -ml-2">
              Brand Identity
            </p>
          </motion.div>
        </div>

        {/* ===== Mobile Feature Points (visible only on small screens) ===== */}
        <div className="flex flex-col items-center justify-center gap-3 mt-10 md:hidden">
          {[
            "🎨 Creative Direction",
            "💡 UI/UX Design",
            "💻 Development",
            "🏷️ Brand Identity",
          ].map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] px-4 py-2 rounded-xl text-gray-200 text-sm sm:text-base josefin-sans shadow-lg border border-white/10"
            >
              {point}
            </motion.div>
          ))}
        </div>

        {/* ===== Bottom Caption ===== */}
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
