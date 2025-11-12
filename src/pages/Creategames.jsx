import React, { useState } from "react";

export default function CreateGames() {
  const [lobbyName, setLobbyName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [playTime, setPlayTime] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);

  const sports = ["Football", "Basketball", "Cricket", "Volleyball", "Badminton"];
  const players = ["Player 1", "Player 2", "Player 3"];

  // Toggle sports selection
  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  // Handle create action
  const handleCreateLobby = () => {
    if (!lobbyName.trim()) {
      alert("Please enter a lobby name first 😊");
      return;
    }
    if (selectedSports.length === 0) {
      alert("Pick at least one sport to make it fun!");
      return;
    }
    alert(
      `🎮 Game Session Ready!\n\nName: ${lobbyName}\nPlayers: ${maxPlayers}\nTime: ${
        playTime || "Not set"
      }\nSports: ${selectedSports.join(", ")}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-red-950/20 text-white flex justify-center items-center px-6 py-16">
      <div className="max-w-5xl w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Let's Create Your Game
          </h1>
          <p className="text-gray-400 text-lg">
            Set your vibe, choose your sport, and get ready to play.
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-[2fr,1fr] gap-10">
          {/* Left Panel */}
          <div className="space-y-8">
            {/* Lobby Info */}
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300">
              <h2 className="text-xl font-semibold text-red-400 mb-6">
                Lobby Details
              </h2>

              {/* Lobby Name */}
              <div className="mb-5">
                <label className="block text-gray-300 mb-2 text-sm">
                  Lobby Name
                </label>
                <input
                  type="text"
                  value={lobbyName}
                  onChange={(e) => setLobbyName(e.target.value)}
                  placeholder="Enter a cool name"
                  className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300 placeholder-gray-500"
                />
              </div>

              {/* Max Players */}
              <div className="mb-5">
                <label className="block text-gray-300 mb-2 text-sm">
                  Maximum Players
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                    className="flex-1 accent-red-500 cursor-pointer hover:scale-[1.03] transition-transform duration-200"
                  />
                  <span className="text-red-400 font-bold text-lg">
                    {maxPlayers}
                  </span>
                </div>
              </div>

              {/* Play Time */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Play Time
                </label>
                <input
                  type="datetime-local"
                  value={playTime}
                  onChange={(e) => setPlayTime(e.target.value)}
                  className="w-full bg-black/60 border border-gray-700/50 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-red-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Sports Selection */}
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300">
              <h2 className="text-xl font-semibold text-red-400 mb-6">
                Choose Your Sports
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {sports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => toggleSport(sport)}
                    className={`py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                      selectedSports.includes(sport)
                        ? "bg-gradient-to-r from-red-600 to-pink-600 text-white scale-[1.04]"
                        : "bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white hover:scale-[1.02]"
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>

              {/* Selected Sports */}
              <div className="mt-6 border border-red-800/40 rounded-lg p-4 bg-black/40">
                <p className="text-gray-400 mb-2 text-sm">
                  You picked{" "}
                  <span className="text-red-400 font-semibold">
                    {selectedSports.length}
                  </span>{" "}
                  {selectedSports.length === 1 ? "sport" : "sports"}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedSports.length > 0 ? (
                    selectedSports.map((sport) => (
                      <span
                        key={sport}
                        className="px-3 py-1 bg-red-800/40 text-red-200 rounded-full text-xs"
                      >
                        {sport}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">
                      none selected yet
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateLobby}
              className="w-full bg-red-600 text-white font-semibold py-4 rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
               Create Lobby
            </button>
          </div>

          {/* Right Panel */}
          <div>
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-red-400">
                  Joined Players
                </h2>
                <span className="text-gray-400 text-sm">
                  {players.length} / {maxPlayers}
                </span>
              </div>

              {/* Player List */}
              <div className="flex flex-col gap-3">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-black/50 border border-gray-800/50 rounded-lg p-3 hover:border-red-600/50 hover:bg-red-900/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center font-bold text-white">
                      {index + 1}
                    </div>
                    <span className="flex-1 text-gray-200 font-medium">
                      {player}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status Dots */}
              <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
                <span>
                  {players.length} of {maxPlayers} players
                </span>
                <div className="flex gap-1">
                  {[...Array(maxPlayers)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i < players.length ? "bg-red-500 scale-110" : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
