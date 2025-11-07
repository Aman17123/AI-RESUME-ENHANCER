"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100vh] mt-10 flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* ====== Text Section ====== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold josefin-sans text-gray-900 leading-tight">
          Stop Applying. Start{" "}
          <span className="text-[#021F81] underline decoration-[#021F81]/30">
            Getting Hired.
          </span>
        </h1>

        <p className="text-gray-600 mt-4 josefin-sans text-base sm:text-lg">
          Our AI instantly scans, optimizes, and tailors your resume to beat the
          ATS and match the job description every time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <div className="flex font-bold josefin-sans items-center gap-2 text-sm sm:text-base text-gray-800">
            <span className="  text-yellow-500  text-lg">★★★★</span>
            4000+ Resume's fixed
          </div>

          <Link
            href="#"
            className="bg-[#021F81] text-white text-sm josefin-sans sm:text-base px-6 py-2.5 rounded-2xl hover:bg-[#031a66] transition-all shadow-md"
          >
            Upload Resume
          </Link>
        </div>
      </motion.div>

      {/* ====== Resume Layout Section ====== */}
      <div className="relative flex justify-center items-end mt-16 w-full max-w-5xl mx-auto">
        {/* ====== Center Resume ====== */}
        <motion.div
          initial={{ opacity: 0, y: 120, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.08,
            y: -10,
            boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
            transition: { duration: 0.25, ease: "easeOut" }, // 🧠 faster hover
          }}
          className="relative z-[10] w-[60%] sm:w-[45%] md:w-[30%] aspect-[1/1.414] rounded-2xl rotate-[4deg] shadow-2xl bg-white border border-transparent"
        >
          <Image
            src="https://i.pinimg.com/1200x/48/7c/13/487c13a9ed77a264ff9193f61c9261de.jpg"
            alt="Resume Example Center"
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 20vw"
            className="object-cover rounded-2xl"
          />
        </motion.div>

        {/* ====== Left Resume ====== */}
        <motion.div
          initial={{ opacity: 0, y: 120, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.05,
            y: -8,
            rotate: -8,
            boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
            transition: { duration: 0.25, ease: "easeOut" }, // ⚡ faster hover
          }}
          className="absolute left-1/2 -translate-x-[140%] sm:-translate-x-[150%] -translate-y-1 w-[30%] sm:w-[25%] md:w-[20%] aspect-[1/1.414] rounded-xl shadow-xl rotate-[-12deg] z-[20] bg-white border border-transparent"
        >
          <Image
            src="https://i.pinimg.com/736x/f7/7c/c9/f77cc9be9b7ee9316c0e707a38590c00.jpg"
            alt="Resume Example Left"
            fill
            quality={100}
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 15vw"
            className="object-cover rounded-xl"
          />
        </motion.div>

        {/* ====== Right Resume ====== */}
        <motion.div
          initial={{ opacity: 0, y: 120, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.05,
            y: -8,
            rotate: 8,
            boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
            transition: { duration: 0.25, ease: "easeOut" },
          }}
          className="absolute left-1/2 translate-x-[55%] -translate-y-12 sm:-translate-y-20 md:-translate-y-32
                    w-[30%] sm:w-[25%] md:w-[20%] aspect-[1/1.414] rounded-xl shadow-xl rotate-[12deg]
                    z-[20] overflow-hidden border-[0.5px] border-white"
        >
          <Image
            src="https://i.pinimg.com/736x/e6/8d/b3/e68db3e71629d4a89e22ff3490b843d2.jpg"
            alt="Resume Example Right"
            fill
            quality={100}
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 15vw"
            className="object-cover rounded-xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          />
        </motion.div>


      </div>
    </section>
  );
}