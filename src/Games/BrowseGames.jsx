import React from "react";

const BrowseGames = () => {
  const games = []; // later you'll add logic

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Sports Banner */}
      <div className="relative w-full h-64 md:h-72">
        <img
          src="https://images.unsplash.com/photo-1603874979869-1b2b8e6a8f3a?auto=format&fit=crop&w=1920&q=80
"
          alt="Sports Banner"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 uppercase tracking-wide">
            Browse Games
          </h1>
        </div>
      </div>

      {/* Games Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200 border-b border-red-700 pb-2">
          Available Games
        </h2>

        {/* Games List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.length > 0 ? (
            games.map((game, i) => (
              <div
                key={i}
                className="bg-zinc-900 p-5 rounded-xl shadow-md hover:shadow-red-700/40 transition-all duration-300 border border-zinc-800 hover:border-red-700"
              >
                <h3 className="text-xl font-bold text-red-500 mb-2">
                  {game.name}
                </h3>
                <p className="text-gray-400 text-sm">📍 {game.location}</p>
                <p className="mt-2 text-sm text-gray-300">
                  Players Joined: {game.players?.length}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg py-20">
              No games found 😢 <br />
              <span className="text-sm text-gray-400">
                Be the first to create one!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseGames;
