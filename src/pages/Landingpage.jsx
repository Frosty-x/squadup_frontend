import React, { memo, useContext } from "react";
import { Instagram, Facebook } from "lucide-react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import { AuthProvider,AuthContext } from "../context/AuthContext";
import Blank from "../components/Blank";

export default function LandingPage() {
  // const {user, loading} = useContext(AuthContext)
  return (
    <div className="relative h-screen landingmain text-white overflow-hidden flex flex-col">
      {/* Gradient Overlay */}

      {/* Navbar */}
      {/* {user ? <Navbar/> : <Blank/> } */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      
    </div>
  );
}