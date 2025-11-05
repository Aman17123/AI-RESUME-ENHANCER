"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "../globals.css";

export default function HeroResumeSection() {
  return (
    <section className="relative w-full bg-gradient-to-tr from-[#f7faff] to-[#e9f1ff] overflow-hidden">
      {/* ===== Background Curves ===== */}
      <div className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[-120px] left-0 w-full"
        >
          <path
            d="M0,96L60,85.3C120,75,240,53,360,69.3C480,85,600,139,720,138.7C840,139,960,85,1080,80C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            fill="url(#grad)"
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dbe9ff" />
              <stop offset="100%" stopColor="#f7faff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-7xl josefin-sans mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-20">
        {/* === Left Text Side === */}
        <div className="flex flex-col max-w-xl space-y-6 text-left mt-10 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-gray-900 josefin-sans"
          >
            Fix your resume and enhance its chances <br />
            <span className="text-gray-800">
              of landing an{" "}
              <span className="text-[#ff7b00] font-bold">interview.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 leading-relaxed josefin-sans text-base sm:text-lg"
          >
            Enhance your resume and create different chances of getting calls
            from big FANG companies.
          </motion.p>

          {/* === Company Logos === */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-4 sm:gap-6 mt-4"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              width={70}
              height={40}
              className="object-contain"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              width={70}
              height={40}
              className="object-contain"
            />
            <Image
              src="https://www.citypng.com/public/uploads/preview/pornhub-logo-transparent-background-701751694713027d93zve4tde.png"
              alt="Nvidia"
              width={70}
              height={40}
              className="object-contain"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"
              alt="TikTok"
              width={50}
              height={50}
              className="object-contain"
            />
          </motion.div>

          {/* === Button === */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 w-fit bg-black text-white text-sm sm:text-base px-6 py-3 rounded-md shadow-md hover:scale-105 hover:bg-[#ff7b00] transition-transform"
          >
            Upload Resume
          </motion.button>

          {/* === Bottom Caption === */}
          <p className="text-sm text-gray-400 mt-4">
            text of the printing and typesetting industry.
          </p>
        </div>

        {/* === Right Resume Preview === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
        >
          {/* ===== Main Resume ===== */}
          <div className="relative w-[75vw] sm:w-[360px] md:w-[420px] aspect-[3/4] rounded-[24px] shadow-xl overflow-hidden border-[6px] sm:border-[3px] border-white bg-white z-10">
            <Image
              src="https://i.pinimg.com/736x/77/de/37/77de37a4f5877b9b176aff2b6ba650f0.jpg"
              alt="Resume Example"
              fill
              quality={100}
              className="object-cover"
            />
          </div>

          {/* ===== Outline Lines (Hidden on Mobile) ===== */}
          <div className="hidden sm:block absolute w-[380px] h-[480px] border-2 border-[#a0b4cc] rounded-[24px] top-[20px] left-0"></div>

          {/* ===== Small Resume Card (Same position across all sizes) ===== */}
          <div className="absolute right-[-50px] top-[130px] w-[28vw] sm:w-[160px] sm:h-[210px] h-[36vw] rounded-xl shadow-lg border-[3px] border-white bg-white overflow-hidden z-20">
            <Image
              src="https://i.pinimg.com/1200x/56/7a/11/567a11ce55be09f4101baf1b6a72d030.jpg"
              alt="Mini Resume"
              fill
              quality={100}
              className="object-cover"
            />
          </div>

          {/* ===== Bottom Decorative Line (Hidden on Mobile) ===== */}
          <div
            className="
              hidden 
              sm:block 
              absolute 
              w-[360px] sm:w-[420px] 
              h-[100px] sm:h-[120px] 
              border-2 border-[#a0b4cc] 
              rounded-[24px] 
              top-[280px] sm:top-[300px] 
              left-[120px] sm:left-[170px]
            "
          ></div>
        </motion.div>

      </div>
    </section>
  );
}
