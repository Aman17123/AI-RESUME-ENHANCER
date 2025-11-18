"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({
  logoColor = "#021F81",
  buttonColor = "#021F81",
  scrollBgColor = "rgba(255,255,255,0.9)",
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 kosugi-maru-regular`}
      style={{
        backgroundColor: scrolled ? scrollBgColor : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3 flex justify-between items-center gap-x-10">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold select-none hover:opacity-80 transition-opacity"
          style={{ color: logoColor }}
        >
          Logo
        </Link>

        {/* BUTTON */}
        <Link
          href="/login"
          className="text-sm md:text-base text-white px-4  md:px-5 py-1.5 md:py-2 rounded-full hover:opacity-90 transition-all duration-300 shadow-sm"
          style={{ backgroundColor: buttonColor }}
        >
          Login / Sign up
        </Link>
      </div>
    </nav>
  );
}
