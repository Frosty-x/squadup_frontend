import React, { useState, useCallback } from "react";
import { MapPin, Calendar, Trophy, Users } from "lucide-react";

export default function CreateGames() {
  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    description: "",
    date: "",
    duration: 60,
    venueName: "",
    address: "",
    city: "", 
    playersNeeded: 4
  });

  const [errors, setErrors] = useState({});

  const sports = [
    "Football", "Basketball", "Cricket",
    "Volleyball", "Badminton"
  ];

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Game title is required";
    if (!formData.sport) newErrors.sport = "Please select a sport";
    if (!formData.date) {
      newErrors.date = "Date and time are required";
    } else if (new Date(formData.date) < new Date()) {
      newErrors.date = "Date must be in the future";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (formData.playersNeeded < 2) newErrors.playersNeeded = "At least 2 players needed";
    if (formData.description.length > 500) newErrors.description = "Description must be under 500 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateGame = () => {
    if (!validateForm()) return;

    const gameData = {
      ...formData,
      duration: parseInt(formData.duration, 10),
      playersNeeded: parseInt(formData.playersNeeded, 10)
    };

    console.log("Creating game:", gameData);
    alert(
      `Game Session Created!\n\n` +
      `Title: ${gameData.title}\n` +
      `Sport: ${gameData.sport}\n` +
      `Players Needed: ${gameData.playersNeeded}\n` +
      `Duration: ${gameData.duration} minutes\n` +
      `Date: ${new Date(gameData.date).toLocaleString()}\n` +
      `Location: ${gameData.venueName || 'TBD'}, ${gameData.address}, ${gameData.city}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-red-950/20 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Create Your Game Session
          </h1>
          <p className="text-gray-400 text-lg">
            Set up your game, pick your sport, and find teammates
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-[2fr,1fr] gap-10">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            {/* Game Details Section */}
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Trophy size={24} />
                Game Details
              </h2>

              {/* Game Title */}
              <div className="mb-5">
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Game Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Saturday Football"
                  className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300 placeholder-gray-500"
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Sport Selection */}
              <div className="mb-5">
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Select Sport *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sports.map((sport) => (
                    <button
                      type="button"
                      key={sport}
                      onClick={() => handleChange("sport", sport)}
                      className={`py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        formData.sport === sport
                          ? "bg-gradient-to-r from-red-600 to-pink-600 text-white scale-[1.04]"
                          : "bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white hover:scale-[1.02]"
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
                {errors.sport && (
                  <p className="text-red-400 text-xs mt-1">{errors.sport}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Description <span className="text-gray-500">(optional, max 500 chars)</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Tell players what to expect..."
                  rows="3"
                  maxLength="500"
                  className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300 placeholder-gray-500 resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.description && (
                    <p className="text-red-400 text-xs">{errors.description}</p>
                  )}
                  <p className="text-gray-500 text-xs ml-auto">
                    {formData.description.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Date & Duration */}
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Calendar size={24} />
                Schedule
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Date & Time */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Duration */}
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
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      className="flex-1 accent-red-500 cursor-pointer"
                    />
                    <span className="text-red-400 font-bold text-lg min-w-[60px] text-center">
                      {formData.duration} min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <MapPin size={24} />
                Location
              </h2>
              <div className="space-y-5">
                {/* Venue Name */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Venue Name <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(e) => handleChange("venueName", e.target.value)}
                    placeholder="e.g., Central Park"
                    className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300 placeholder-gray-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Street address or landmark"
                    className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300 placeholder-gray-500"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Enter city name"
                    className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Players Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Number of Players</span>
                <span className="text-red-400 font-bold text-2xl">
                  {formData.playersNeeded}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={formData.playersNeeded}
                onChange={(e) => handleChange("playersNeeded", parseInt(e.target.value, 10))}
                className="w-full accent-red-500 cursor-pointer "
              />
              {errors.playersNeeded && (
                <p className="text-red-400 text-xs mt-1">{errors.playersNeeded}</p>
              )}
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateGame}
              className="w-full bg-red-700 text-white font-semibold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-red-900/50"
            >
              Create Game Session
            </button>
          </div>

          {/* Right Panel - Players Info */}
          <div>
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300 sticky top-6">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Users size={24} />
                All Information
              </h2>
              {/* Summary */}
              <div className="mt-8 pt-6 border-t border-red-800/40">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Session Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sport</span>
                    <span className="text-white font-medium">{formData.sport || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-medium">{formData.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white font-medium">{formData.playersNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white font-medium">{formData.city || "-"}</span>
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
