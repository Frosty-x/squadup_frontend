import React, { memo } from "react";
import { Instagram, Facebook } from "lucide-react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

export default function LandingPage() {
  return (
    <div className="relative h-screen landingmain text-white overflow-hidden flex flex-col">
      {/* Gradient Overlay */}

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      
    </div>
  );
}