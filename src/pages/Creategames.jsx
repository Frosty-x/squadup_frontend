import React from "react";
import { MapPin, Calendar, Trophy, Users } from "lucide-react";

export default function CreateGames() {
  const sports = ["Football", "Basketball", "Cricket", "Volleyball", "Badminton"];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-16 w-96 h-96 bg-red-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Create Your Game Session
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-light">
            Set up your session, define the details, and invite players
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-[2fr,1fr] gap-10">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Game Details */}
            <div className="bg-neutral-900/80 border border-red-700/30 rounded-2xl p-8 shadow-xl shadow-red-900/30">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Trophy size={22} className="text-red-500" />
                Game Details
              </h2>

              {/* Game Title */}
              <div className="mb-5">
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Game Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Weekend Football Match"
                  className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
                />
              </div>

              {/* Sport Selection */}
              <div className="mb-5">
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Select Sport *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sports.map((sport) => (
                    <button
                      key={sport}
                      type="button"
                      className="py-2.5 rounded-lg font-medium text-sm bg-neutral-800 text-gray-300 border border-red-800/30 hover:bg-red-700/80 hover:border-red-600/50 hover:text-white transition-all duration-300"
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Description <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  placeholder="Provide a brief description or rules..."
                  rows="3"
                  maxLength="500"
                  className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 resize-none transition-all"
                ></textarea>
                <p className="text-gray-500 text-xs mt-1 text-right">0/500</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-neutral-900/80 border border-red-700/30 rounded-2xl p-8 shadow-xl shadow-red-900/30">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Calendar size={22} className="text-red-500" />
                Schedule
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Duration (minutes)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="30"
                      max="180"
                      step="15"
                      className="flex-1 accent-red-600 cursor-pointer"
                    />
                    <span className="text-red-400 font-semibold text-lg min-w-[60px] text-center">
                      60 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-neutral-900/80 border border-red-700/30 rounded-2xl p-8 shadow-xl shadow-red-900/30">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <MapPin size={22} className="text-red-500" />
                Location
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Venue Name <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g.,Central Sports Ground"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Street or landmark"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Players Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Number of Players</span>
                <span className="text-red-400 font-semibold text-xl">4</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            {/* Create Button */}
            <button className="w-full bg-linear-to-r from-red-700 via-red-600 to-orange-600 text-white font-medium py-4 rounded-xl hover:opacity-90 active:scale-[0.99] transition-all duration-300 shadow-md shadow-red-900/40">
              Create Game Session
            </button>
          </div>

          {/* Right Panel */}
          <div>
            <div className="bg-neutral-900/80 border border-red-700/30 rounded-2xl p-8 shadow-xl shadow-red-900/30 sticky top-6">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Users size={22} className="text-red-500" />
                Session Summary
              </h2>
              <div className="mt-6 pt-4 border-t border-red-700/30">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sport</span>
                    <span className="text-white font-medium">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-medium">60 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white font-medium">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
