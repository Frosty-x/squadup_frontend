import React, { useState } from "react";
import { MapPin, Calendar, Trophy, Users, Target } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import gameService from '../services/gameService';

export default function CreateGames() {
  const sports = ["Football", "Basketball", "Cricket", "Volleyball", "Badminton"];
  const navigate = useNavigate();

  // form data state
  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    description: "",
    date: "",
    duration: 60,
    venueName: "",
    address: "",
    city: "",
    playersNeeded: 4,
    skillLevel: "any"
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [characterCount, setCharacterCount] = useState(0);

  // Handle text input changes (title, venueName, address, city)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSportSelect = (selectedSport) => {
    setFormData(prev => ({
      ...prev,
      sport: selectedSport
    }));
  };

  const handleSkillLevelSelect = (selectedLevel) => {
    setFormData(prev => ({
      ...prev,
      skillLevel: selectedLevel
    }));
  };

  // Handle description with character limit
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setFormData(prev => ({
        ...prev,
        description: value
      }));
      setCharacterCount(value.length);
    }
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      duration: value
    }));
  };

  const handlePlayersChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      playersNeeded: value
    }));
  };

  const handleDateChange = (e) => {
    setFormData(prev => ({
      ...prev,
      date: e.target.value
    }));
  };

  // Validate form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Game title is required";
    }

    if (!formData.sport) {
      newErrors.sport = "Please select a sport";
    }

    if (!formData.date) {
      newErrors.date = "Date and time are required";
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.date = "Date must be in the future";
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (formData.playersNeeded < 2) {
      newErrors.playersNeeded = "At least 2 players are required";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  // Handle form submission
  const handleSubmit = async () => {
    setErrors({});
    const { isValid, errors: validationErrors } = validateForm();

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const gameData = {
      sport: formData.sport,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      duration: formData.duration,
      location: {
        venueName: formData.venueName,
        address: formData.address,
        city: formData.city
      },
      playersNeeded: formData.playersNeeded,
      skillLevel: formData.skillLevel
    };

    try {
      const response = await gameService.createGame(gameData);
      console.log("Game created successfully:", response);
      
      alert(`Game "${response.data.title}" created successfully!`);
      
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error creating game:", error);
      setErrors({ 
        submit: error.message || "Failed to create game. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

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
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekend Football Match"
                  className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
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
                      key={sport}
                      type="button"
                      onClick={() => handleSportSelect(sport)}
                      className={`py-2.5 rounded-lg font-medium text-sm border transition-all duration-300 ${
                        formData.sport === sport
                          ? "bg-red-700 border-red-600 text-white"
                          : "bg-neutral-800 text-gray-300 border-red-800/30 hover:bg-red-700/80 hover:border-red-600/50 hover:text-white"
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
                {errors.sport && (
                  <p className="text-red-400 text-sm mt-1">{errors.sport}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Description <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Provide a brief description or rules..."
                  rows="3"
                  maxLength="500"
                  className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 resize-none transition-all"
                ></textarea>
                <p className="text-gray-500 text-xs mt-1 text-right">
                  {characterCount}/500
                </p>
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
                    value={formData.date}
                    onChange={handleDateChange}
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 transition-all"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-sm mt-1">{errors.date}</p>
                  )}
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
                      value={formData.duration}
                      onChange={handleDurationChange}
                      className="flex-1 accent-red-600 cursor-pointer"
                    />
                    <span className="text-red-400 font-semibold text-lg min-w-[60px] text-center">
                      {formData.duration} min
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
                    name="venueName"
                    value={formData.venueName}
                    onChange={handleInputChange}
                    placeholder="e.g., Central Sports Ground"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street or landmark"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className="w-full bg-black/60 border border-red-700/30 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 transition-all"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Players & Skill Level Section */}
            <div className="bg-neutral-900/80 border border-red-700/30 rounded-2xl p-8 shadow-xl shadow-red-900/30">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Users size={22} className="text-red-500" />
                Players & Skill Level
              </h2>

              {/* Players Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-300 text-sm">Number of Players</span>
                  <span className="text-red-400 font-semibold text-xl">
                    {formData.playersNeeded}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={formData.playersNeeded}
                  onChange={handlePlayersChange}
                  className="w-full accent-red-600 cursor-pointer"
                />
                {errors.playersNeeded && (
                  <p className="text-red-400 text-sm mt-1">{errors.playersNeeded}</p>
                )}
              </div>

              {/* Skill Level Selection */}
              <div>
                <label className="block text-gray-300 mb-3 text-sm font-medium">
                  Skill Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['any', 'beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSkillLevelSelect(level)}
                      className={`py-2.5 rounded-lg font-medium text-sm border transition-all duration-300 capitalize ${
                        formData.skillLevel === level
                          ? "bg-red-700 border-red-600 text-white"
                          : "bg-neutral-800 text-gray-300 border-red-800/30 hover:bg-red-700/80 hover:border-red-600/50 hover:text-white"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white font-medium py-4 rounded-xl hover:opacity-90 active:scale-[0.99] transition-all duration-300 shadow-md shadow-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Game..." : "Create Game Session"}
            </button>

            {/* Show general error if any */}
            {errors.submit && (
              <p className="text-red-400 text-sm mt-2 text-center">{errors.submit}</p>
            )}
          </div>

          {/* Right Panel - Summary */}
          <div>
            <div className="bg-neutral-900/80 border border-red-700/30 rounded-2xl p-8 shadow-xl shadow-red-900/30 sticky top-6">
              <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <Target size={22} className="text-red-500" />
                Session Summary
              </h2>
              <div className="mt-6 pt-4 border-t border-red-700/30">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sport</span>
                    <span className="text-white font-medium">
                      {formData.sport || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-medium">
                      {formData.duration} min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white font-medium">
                      {formData.playersNeeded}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Skill Level</span>
                    <span className="text-white font-medium capitalize">
                      {formData.skillLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white font-medium">
                      {formData.city || "-"}
                    </span>
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