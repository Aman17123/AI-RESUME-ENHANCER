import Navbar from './component/Navbar';
import Hero from './component/Hero';
import ResumeHighlight from './component/ResumeHighlight';
import "./globals.css";


export default function HomePage() {
  return (
    <div >
      {/* Navbar */}
      <Navbar />
      <Hero/>
      <ResumeHighlight/>
    </div>
  );
}
