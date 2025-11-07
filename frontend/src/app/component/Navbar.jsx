"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import "../globals.css";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      className="w-full fixed top-0 left-0 z-50 mt-5 bg-white/40 backdrop-blur-md kosugi-maru-regular"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <span className="text-[#021F81] text-xl tracking-wide">
          Logo
        </span>

        {/* Auth Buttons */}
        <div className="flex items-center pr-6">
          <Link
            href="/login"
            className="text-sm text-[#021F81] border-2 border-[#021F81] rounded-xl px-3 py-1 hover:bg-blue-50/40 transition-all"
          >
            Login <span className="text-[#021F81]"> / </span> Sign up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
