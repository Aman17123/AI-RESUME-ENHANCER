"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#02285C] text-white py-10 px-6 sm:px-10 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0 text-center md:text-left">
        
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start"
        >
          <h2 className="text-white text-[22px] sm:text-[24px] kosugi-maru-regular font-semibold tracking-wider mb-2">
            Logo
          </h2>
          <p className="text-[#BFD3F2] josefin-sans text-[14px] sm:text-[15px] leading-relaxed max-w-xs sm:max-w-sm">
            This is where the magic happens: our AI instantly
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:text-right"
        >
          <p className="text-[#BFD3F2] josefin-sans text-[13px] sm:text-[14px]">
            © Website Name All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
