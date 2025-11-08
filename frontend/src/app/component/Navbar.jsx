"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../globals.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${
          scrolled
            ? "bg-white/90 shadow-md backdrop-blur-lg"
            : "bg-transparent backdrop-blur-none"
        }
        kosugi-maru-regular
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#021F81] text-2xl md:text-3xl tracking-wide select-none hover:opacity-80 transition-opacity"
        >
          Logo
        </Link>

        {/* Auth Button */}
        <Link
          href="/login"
          className="text-base md:text-lg text-white bg-[#021F81] px-5 md:px-7 py-2 md:py-2.5 rounded-full hover:bg-[#0d2cc4] transition-all duration-300 shadow-sm"
        >
          Login / Sign up
        </Link>
      </div>
    </nav>
  );
}
