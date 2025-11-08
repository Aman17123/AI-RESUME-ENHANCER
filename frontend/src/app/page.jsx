"use client";

import dynamic from "next/dynamic";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import HeroResumeSection from "./component/HeroResumeSection";
import UploadSection from "./component/Mid";
import Footer from "./component/Footer";
import HoverResume from "./component/HoverResume";
import "./globals.css";

// Dynamically import ResumeHighlight (client-side only)
const ResumeHighlight = dynamic(() => import("./component/ResumeHighlight"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="">
      <Navbar />    
      <Hero />
      <ResumeHighlight />
      <HeroResumeSection />
      <UploadSection />
      <HoverResume />
      <Footer />
    </div>
  );
}
