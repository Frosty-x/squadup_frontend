import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Clock, Target, Trophy, ChevronDown, Users } from "lucide-react";
import gameService from "../services/gameService";
import { toast } from "react-toastify";

export default function BrowseGames() {

  const navigate = useNavigate();
  const  { user } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("All Levels");
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sports = ["All Sports", "Football", "Basketball", "Cricket", "Volleyball", "Badminton"];
  const skillLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const joinGame = async (gameId) => {
    try {
      const response = await gameService.joinGame(gameId);
      toast.success(response.message || "Joined game successfully!");
      await fetchGames();
    } catch (error) {
      toast.error(error.message);
      await fetchGames();
    }
  };

  const leaveGame = async (gameId) => {
    try {
      const response = await gameService.leaveGame(gameId);
      toast.success(response.message || "Left game successfully");
      await fetchGames();
    } catch (error) {
      toast.error(error.message || "Failed to leave game");
      await fetchGames();
    }
  };

  const cancelGame = async (gameId) => {
    if (window.confirm("Are you sure you want to cancel this game? This action cannot be undone.")) {
      try {
        const response = await gameService.cancelGame(gameId);
        toast.success(response.message || "Game cancelled successfully");
        await fetchGames();
      } catch (error) {
        toast.error(error.message || "Failed to cancel game");
      }
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
      setGames(response.data || response);
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

  // Check if user has joined the game
  const isUserJoined = (game) => {
    if(!user || !game.currentPlayers) {
      return false;
    }

    // Convert to array if not already
    const players = Array.isArray(game.currentPlayers) ? game.currentPlayers : [];
    
    return players.some(player => {
      // Handle both object and string IDs
      const playerId = typeof player === 'object' && player !== null ? player._id : player;
      const userId = user._id;
      
      // Convert both to strings for comparison to avoid type issues
      return String(playerId).trim() === String(userId).trim();
    });
  };

  // Check if user is the creator of the game
  const isUserCreator = (game) => {
    if (!user || !game.creator) {
      return false;
    }
    
    // Handle both object and string IDs
    const creatorId = typeof game.creator === 'object' && game.creator !== null ? game.creator._id : game.creator;
    const userId = user._id;
    
    // Convert both to strings for comparison
    return String(creatorId).trim() === String(userId).trim();
  };

  const filteredGames = games.filter((game) => {
    // Check if game has expired
    const gameDate = new Date(game.date);
    const now = new Date();
    const isExpired = gameDate < now;

    // Don't show expired games in browse page
    if (isExpired) return false;

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

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-3">
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
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${selectedSport === sport ? "bg-red-700 text-white" : "text-gray-300 hover:bg-red-700/50"
                        }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${selectedSkillLevel === level ? "bg-red-700 text-white" : "text-gray-300 hover:bg-red-700/50"
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

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            <p className="text-gray-400 mt-4">Loading games...</p>
          </div>
        )}

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

        {!loading && !error && filteredGames.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => {
              const status = game.status?.toLowerCase();
              const current = game.currentPlayers?.length || 0;
              const needed = game.playersNeeded || 0;
              
              // Check if game has expired (date has passed)
              const gameDate = new Date(game.date);
              const now = new Date();
              const isExpired = gameDate < now;
              
              // Check if game is actually full based on player count
              const isFull = current >= needed;
              const isOpen = !isFull && !isExpired && status !== "cancelled" && status !== "completed";
              
              // Calculate button states
              const userIsCreator = isUserCreator(game);
              const userHasJoined = isUserJoined(game);

              return (
                <div
                  key={game._id}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-red-700/20 rounded-2xl overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30 hover:scale-105"
                >
                  <div className="h-2 bg-gradient-to-r from-red-700 via-orange-600 to-red-700"></div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-1.5 bg-red-950/30 px-2.5 py-1 rounded-lg border border-red-700/30">
                        <Trophy size={14} className="text-red-400" />
                        <span className="text-red-400 font-medium text-xs">{game.sport}</span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          isExpired
                            ? "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                            : isOpen
                            ? "bg-green-500/20 text-green-400 border border-green-500/40"
                            : isFull
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                        }`}
                      >
                        {isExpired ? "EXPIRED" : isOpen ? "OPEN" : isFull ? "FULL" : "CLOSED"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{game.title}</h3>
                    <p className="text-gray-400 text-xs mb-4 flex items-center gap-1.5">
                      <Users size={12} className="text-gray-500" />
                      {game.creator?.name || "Unknown"}
                    </p>

                    <div className="space-y-2 mb-4 bg-black/30 rounded-lg p-3 border border-red-900/20">
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <Calendar size={14} className="text-red-400" />
                        <span>{formatDate(game.date)} at {formatTime(game.date)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <MapPin size={14} className="text-red-400" />
                        <span>{game.location?.city}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-gray-300 text-xs">
                          <Clock size={14} className="text-red-400" />
                          <span>{game.duration} min</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-300 text-xs">
                          <Target size={14} className="text-red-400" />
                          <span className="capitalize">{game.skillLevel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 bg-neutral-950/50 rounded-lg p-3 border border-red-900/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs font-medium">Players</span>
                        <span className="text-white font-bold text-sm bg-red-950/50 px-2 py-0.5 rounded border border-red-800/30">
                          {current} / {game.playersNeeded}
                        </span>
                      </div>

                      <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden border border-neutral-700">
                        <div
                          className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(current / game.playersNeeded) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {isExpired ? (
                        <button
                          disabled
                          className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 bg-neutral-800 text-gray-500 cursor-not-allowed border border-neutral-700"
                        >
                          Game Expired
                        </button>
                      ) : userIsCreator ? (
                        <button
                          onClick={() => cancelGame(game._id)}
                          className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white hover:from-red-800 hover:via-red-700 hover:to-red-600 active:scale-95"
                        >
                          Cancel Game
                        </button>
                      ) : userHasJoined ? (
                        <button
                          onClick={() => leaveGame(game._id)}
                          className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 text-white hover:from-orange-700 hover:via-yellow-700 hover:to-orange-700 active:scale-95"
                        >
                          Leave Game
                        </button>
                      ) : (
                        <button
                          onClick={() => joinGame(game._id)}
                          disabled={!isOpen}
                          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                            isOpen
                              ? "bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white hover:from-red-600 hover:via-red-500 hover:to-orange-500 active:scale-95"
                              : isFull
                              ? "bg-neutral-800 text-gray-500 cursor-not-allowed border border-neutral-700"
                              : "bg-neutral-800 text-gray-500 cursor-not-allowed border border-neutral-700"
                          }`}
                        >
                          {isOpen ? "Join Game" : isFull ? "Game Full" : "Not Available"}
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/GameDetail/${game._id}`)}
                        className="w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-300 bg-neutral-800 text-gray-300 hover:bg-neutral-700 border border-neutral-700 hover:border-red-700/50"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

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