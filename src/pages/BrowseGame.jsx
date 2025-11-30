import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Clock, Target, Trophy, ChevronDown } from "lucide-react";
import gameService from "../services/gameService";
import { toast } from "react-toastify";

export default function BrowseGames() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("All Levels");
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  // API states
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sports = ["All Sports", "Football", "Basketball", "Cricket", "Volleyball", "Badminton"];
  const skillLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const joinGame = async (gameId) => {
  try {
    const response = await gameService.joinGame(gameId);
    setError(response.message);
    await fetchGames();
  } catch (error) {
    toast.error(error.message);
    await fetchGames();
  }
};


  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await gameService.getAllGames();
      setGames(response.data || response); // handles both {data:[]} and []
    } catch (err) {
      setError(err?.message || "Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.sport?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.location?.city?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport = selectedSport === "All Sports" || game.sport === selectedSport;

    const matchesSkillLevel =
      selectedSkillLevel === "All Levels" ||
      (game.skillLevel || "").toLowerCase() === selectedSkillLevel.toLowerCase();

    return matchesSearch && matchesSport && matchesSkillLevel;
  });

  return (
    <div className="min-h-screen mt-15 bg-black text-white px-6 py-16">
      
      <div className="max-w-7xl mx-auto">

        <div className="text-center space-y-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Browse Games
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-light">Find and join games in your area</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, location, or sport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-red-700/30 rounded-xl text-white pl-12 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600/30 placeholder-gray-500 transition-all"
              />
            </div>

            {/* Sport Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSportDropdown(!showSportDropdown);
                  setShowSkillDropdown(false);
                }}
                className="w-full md:w-48 bg-neutral-900 border border-red-700/30 rounded-xl text-white px-4 py-3 flex items-center justify-between hover:border-red-500 transition-all"
              >
                <span className="text-sm">{selectedSport}</span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>

              {showSportDropdown && (
                <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-red-700/30 rounded-xl overflow-hidden z-20 shadow-xl">
                  {sports.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => {
                        setSelectedSport(sport);
                        setShowSportDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedSport === sport ? "bg-red-700 text-white" : "text-gray-300 hover:bg-red-700/50"
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Skill Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSkillDropdown(!showSkillDropdown);
                  setShowSportDropdown(false);
                }}
                className="w-full md:w-48 bg-neutral-900 border border-red-700/30 rounded-xl text-white px-4 py-3 flex items-center justify-between hover:border-red-500 transition-all"
              >
                <span className="text-sm">{selectedSkillLevel}</span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>

              {showSkillDropdown && (
                <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-red-700/30 rounded-xl overflow-hidden z-20 shadow-xl">
                  {skillLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setSelectedSkillLevel(level);
                        setShowSkillDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedSkillLevel === level ? "bg-red-700 text-white" : "text-gray-300 hover:bg-red-700/50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedSport !== "All Sports" || selectedSkillLevel !== "All Levels") && (
          <div className="mb-8 flex items-center gap-3 flex-wrap">
            <span className="text-gray-400 text-sm">Active Filters:</span>

            {selectedSport !== "All Sports" && (
              <span className="px-3 py-1 bg-red-700/30 border border-red-700/50 rounded-lg text-sm flex items-center gap-2">
                {selectedSport}
                <button onClick={() => setSelectedSport("All Sports")} className="hover:text-red-400">
                  ✕
                </button>
              </span>
            )}

            {selectedSkillLevel !== "All Levels" && (
              <span className="px-3 py-1 bg-red-700/30 border border-red-700/50 rounded-lg text-sm flex items-center gap-2">
                {selectedSkillLevel}
                <button onClick={() => setSelectedSkillLevel("All Levels")} className="hover:text-red-400">
                  ✕
                </button>
              </span>
            )}

            <button
              onClick={() => {
                setSelectedSport("All Sports");
                setSelectedSkillLevel("All Levels");
              }}
              className="text-red-400 text-sm hover:text-red-300"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            <p className="text-gray-400 mt-4">Loading games...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={fetchGames} className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Games Grid */}
        {!loading && !error && filteredGames.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => {
              const status = game.status?.toLowerCase();
              const isOpen = status === "open";
              const current = game.currentPlayers?.length || 0;

              return (
                <div
                  key={game._id}
                  className="bg-neutral-900 border border-red-700/30 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy size={20} className="text-red-400" />
                      <span className="text-red-400 font-medium text-sm">{game.sport}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isOpen
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {isOpen ? "OPEN" : "FULL"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">Organized by {game.creator?.name}</p>

                  {/* Info */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Calendar size={16} className="text-red-400" />
                      <span>{formatDate(game.date)} at {formatTime(game.date)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin size={16} className="text-red-400" />
                      <span>{game.location?.city}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Clock size={16} className="text-red-400" />
                      <span>{game.duration} minutes</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Target size={16} className="text-red-400" />
                      <span className="capitalize">{game.skillLevel}</span>
                    </div>
                  </div>

                  {/* Players */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Players Joined</span>
                      <span className="text-white font-medium text-sm">
                        {current} / {game.playersNeeded}
                      </span>
                    </div>

                    <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-700 to-orange-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(current / game.playersNeeded) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Join button */}
                  <button
                    onClick={() => joinGame(game._id)}
                    disabled={!isOpen}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white hover:opacity-90 active:scale-[0.98]"
                        : "bg-neutral-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isOpen ? "Join Game" : "Game Full"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredGames.length === 0 && (
          <div className="text-center py-20">
            <Trophy size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new game</p>
          </div>
        )}
      </div>
    </div>
  );
}
