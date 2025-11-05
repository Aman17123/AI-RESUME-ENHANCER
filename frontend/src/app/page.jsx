"use client";

import dynamic from "next/dynamic";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import "./globals.css";

// Dynamically import ResumeHighlight (client-side only)
const ResumeHighlight = dynamic(() => import("./component/ResumeHighlight"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ResumeHighlight />
    </div>
  );
}
