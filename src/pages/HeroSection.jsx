import React from "react";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center-safe flex-1">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 max-w-xl animate-slideInLeft">
          <h1 className="text-5xl lg:text-6xl font-black leading-normal tracking-tight">
            <span className="block text-white mb-2">UNLOCK YOUR</span>
            <span className="block text-red-600">INNER ATHLETE!</span>
          </h1>

          <div className="space-y-2 text-base text-gray-200 pl-1">
            <p className="font-medium badscript">Where mindset meets movement.</p>
            <p className="text-gray-200 badscript">
              Fuel your grind with elite-level precision.
            </p>
          </div>

          <button className="group border border-red-700 hover:text-white font-bold text-sm px-9 py-3.5 rounded-full transition-all duration-300 flex items-center gap-3 hover:scale-105 shadow-xl hover:shadow-red mt-8">
            CHECK NOW
            <ChevronRight
              className="group-hover:translate-x-1 transition-transform duration-300"
              size={20}
            />
          </button>
        </div>

        {/* Right Content */}
        <div className="hidden md:flex justify-center items-center relative translate-y-[50px]">
          <div className="absolute inset-0 animate-fadeInUp delay-200 bg-transparent rounded-full scale-110"></div>

          <div className="relative w-[30rem] h-[40rem] rounded-2xl animate-fadeInUp delay-200 border-5 border-white flex items-center justify-center bg-transparent ">
            <img
              className="scale-237"
              src="/bg5.png"
              alt="Basketball Player"
            />
          </div>
        </div>
      </div>
    </section>
  );
}