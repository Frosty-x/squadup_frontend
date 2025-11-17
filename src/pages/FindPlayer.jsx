import React, { useState, useEffect } from "react";
import TrueFocus from '../Animation/TrueFocus/TrueFocus';
import playerService from '../services/playerService'; // Adjust path if needed


export default function FindPlayer() {

  const [playersData, setPlayersData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await playerService.getPlayers();

        if (response.success) {

          const transformedPlayers = response.Players.map(user => {

            const primarySport = user.sports && user.sports.length > 0 ? user.sports[0] : null;

            const allSportsNames = user.sports && user.sports.length > 0
              ? user.sports.map(s => s.name).join(", ")
              : "N/A";

            return {
              id: user._id,
              name: user.name,
              location: {
                city: user.location?.city || "Unknown"
              },
              profilePic: user.profilePic || "",
              sports: user.sports || [],
              stats: {
                matchPlayed: user.totalGamesPlayed || 0,
                rating: user.overallRating || 0,
                skillLevel: primarySport?.skillLevel || "Beginner",
                sportsSelected: allSportsNames
              }
            };
          });

          setPlayersData(transformedPlayers);
        } else {
          setError(response.message || "Failed to load players");
        }
      } catch (err) {
        console.error("Error fetching players:", err);
        setError(err.message || "Failed to load players");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); 

  return (
    <div className="min-h-screen bg-black px-4 md:px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-neutral-900/90 border border-red-900/40 backdrop-blur-md rounded-2xl p-5 md:p-7 mb-10 shadow-lg 
                        animate-[fadeIn_0.6s_ease]">
          <div className="flex flex-col sm:flex-row text-white justify-between items-start sm:items-center gap-4">
            <TrueFocus
              sentence="Active Players"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />

            <div className="flex gap-3 md:gap-4 flex-wrap">
              <select className="bg-neutral-900 border border-red-800/40 text-white text-sm px-4 py-2 rounded-lg 
                                 hover:border-red-600 transition-all">
                <option>All Sports</option>
                <option>Volleyball</option>
                <option>Cricket</option>
                <option>Football</option>
                <option>Badminton</option>
              </select>

              <select className="bg-neutral-900 border border-red-800/40 text-white text-sm px-4 py-2 rounded-lg 
                                 hover:border-red-600 transition-all">
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Professional</option>
              </select>

              <select className="bg-neutral-900 border border-red-800/40 text-white text-sm px-4 py-2 rounded-lg 
                                 hover:border-red-600 transition-all">
                <option>All Cities</option>
                <option>Kolkata</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-xl">Loading players...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-400 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Players Grid - Only show when not loading and no error */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playersData.map((player, index) => (
              <div
                key={player.id || player._id}
                className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-red-950/20 
                           border border-neutral-800 hover:border-red-700/60 rounded-xl shadow-lg 
                           hover:shadow-red-900/30 transition-all duration-300 overflow-hidden 
                           cursor-pointer group 
                           animate-[fadeInUp_0.7s_ease_forwards] opacity-0"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-950/40 to-neutral-900/60 p-6 text-center border-b border-neutral-800">
                  {player.profilePic ? (
                    <img
                      src={player.profilePic}
                      alt={player.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-red-900/50 
                                 mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-800 to-red-950 
                                    border-4 border-red-800/60 flex items-center justify-center 
                                    mx-auto mb-3">
                      <span className="text-red-100 text-3xl font-bold">
                        {player.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <h3 className="text-white text-lg font-semibold">{player.name}</h3>

                  <p className="text-gray-400 text-sm mt-1 flex justify-center items-center gap-1">
                    <span className="text-red-500">📍</span>
                    {player.location?.city || "Unknown"}
                  </p>
                </div>

                {/* Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-black/30 border border-red-900/20 rounded-lg p-4 text-center
                                   group-hover:border-red-700/40 transition-all">
                      <div className="text-white text-2xl font-bold">{player.stats?.matchPlayed || 0}</div>
                      <div className="text-gray-500 text-xs uppercase mt-1">Matches</div>
                    </div>

                    <div className="bg-black/30 border border-red-900/20 rounded-lg p-4 text-center
                                    group-hover:border-red-700/40 transition-all">
                      <div className="text-white text-2xl font-bold flex items-center justify-center gap-1">
                        {player.stats?.rating || 0}
                        <span className="text-yellow-400 text-lg">★</span>
                      </div>
                      <div className="text-gray-500 text-xs uppercase mt-1">Rating</div>
                    </div>
                  </div>

                  <div className="bg-black/20 border border-red-900/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Skill Level</span>
                      <span className="text-red-400 font-semibold">
                        {player.stats?.skillLevel || "N/A"}
                      </span>
                    </div>

                    <div className="h-px bg-neutral-800"></div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Sports</span>
                      <span className="text-white font-medium truncate ml-2">
                        {player.stats?.sportsSelected || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 
                                     hover:from-red-500 hover:to-red-600 text-white font-bold 
                                     text-sm py-3 rounded-lg mt-5 
                                     transition-all duration-300 hover:scale-105 
                                     shadow-md shadow-red-900/40">
                    RECRUIT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Players Found */}
        {!loading && !error && playersData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No players found</p>
          </div>
        )}

      </div>
    </div>
  );
}