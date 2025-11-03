import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Users, Star, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";

import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen scroll-mx-0 bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-black leading-normal tracking-tight">
              <span className="block text-white mb-2">FIND YOUR</span>
              <span className="block text-red-600">PERFECT TEAMMATE!</span>
            </h1>

            <div className="space-y-2 text-base text-gray-200 pl-1">
              <p className="font-medium badscript">Connect with athletes in your area.</p>
              <p className="text-gray-200 badscript">
                Match skills, rate players, and level up your game.
              </p>
            </div>

            <button
              onClick={handleGetStarted}
              className="group bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-9 py-3.5 rounded-full transition-all duration-300 flex items-center gap-3 hover:scale-105 shadow-xl hover:shadow-red-900/50 mt-8"
            >
              GET STARTED
              <ChevronRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </button>
          </div>

          {/* Right Content */}
          <div className="hidden md:flex justify-center items-center relative translate-y-[50px]">
            <div className="relative w-120 h-160 rounded-2xl border-3 border-white flex items-center justify-center bg-transparent">
              <img
                className="scale-237"
                src="/bg5.png"
                alt="Basketball Player"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              WHY <span className="text-red-600">SQUADUP?</span>
            </h2>
            <p className="text-gray-400 text-lg badscript">Everything you need to find the perfect sports partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-black border border-neutral-800 rounded-2xl p-8 hover:border-red-700 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-red-700/20 rounded-full flex items-center justify-center mb-6">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Find Partners</h3>
              <p className="text-gray-400 badscript">
                Connect with athletes in your city based on sport type and skill level. Never play alone again.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-black border border-neutral-800 rounded-2xl p-8 hover:border-red-700 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-red-700/20 rounded-full flex items-center justify-center mb-6">
                <Star className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Rate Players</h3>
              <p className="text-gray-400 badscript">
                Build your reputation with ratings from teammates. See who's reliable and skilled.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-black border border-neutral-800 rounded-2xl p-8 hover:border-red-700 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-red-700/20 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Track Progress</h3>
              <p className="text-gray-400 badscript">
                Monitor your games played, ratings, and skill improvements across multiple sports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              HOW IT <span className="text-red-600">WORKS</span>
            </h2>
            <p className="text-gray-400 text-lg badscript">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center text-3xl font-black">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Profile</h3>
              <p className="text-gray-400 badscript">
                Sign up and add your sports, skill levels, and location preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center text-3xl font-black">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Find Matches</h3>
              <p className="text-gray-400 badscript">
                Browse athletes nearby who match your sport and skill level.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center text-3xl font-black">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Play & Rate</h3>
              <p className="text-gray-400 badscript">
                Connect, play together, and rate each other to build trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-linear-to-b from-neutral-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            READY TO <span className="text-red-600">SQUAD UP?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 badscript">
            Join thousands of athletes finding their perfect teammates
          </p>
          <button
            onClick={handleGetStarted}
            className="group bg-red-700 hover:bg-red-800 text-white font-bold text-base px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-900/50 inline-flex items-center gap-3"
          >
            {user ? "GO TO DASHBOARD" : "JOIN NOW - IT'S FREE"}
            <ChevronRight
              className="group-hover:translate-x-1 transition-transform duration-300"
              size={24}
            />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 SquadUp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}