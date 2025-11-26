import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Trophy, User, Shield, Award, Star } from 'lucide-react';

const Gamedetail = () => {
  const [event] = useState({
    id: 1,
    name: "Sunday Morning Basketball",
    sport: "Basketball",
    description: "Competitive basketball match at the local court. Intermediate to advanced players preferred.",
    creator: {
      name: "Alex Johnson",
      avatar: "AJ",
      joinedDate: "Member since 2023"
    },
    date: "2025-11-30",
    time: "09:00 AM",
    duration: "2 hours",
    location: "Central Sports Complex, Court 3",
    maxPlayers: 10,
    playersJoined: [
      { id: 1, name: "Alex Johnson", avatar: "AJ", status: "Organizer", rating: 5 },
      { id: 2, name: "Sarah Miller", avatar: "SM", status: "Player", rating: 4 },
      { id: 3, name: "Mike Chen", avatar: "MC", status: "Player", rating: 5 },
      { id: 4, name: "Emily Rodriguez", avatar: "ER", status: "Player", rating: 3 },
      { id: 5, name: "James Wilson", avatar: "JW", status: "Player", rating: 4 },
      { id: 6, name: "Lisa Anderson", avatar: "LA", status: "Player", rating: 3 },
      { id: 7, name: "Tom Brown", avatar: "TB", status: "Player", rating: 5 }
    ],
    skillLevel: "Intermediate",
    equipment: "Bring your own basketball shoes"
  });

  const [isJoined, setIsJoined] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  const handleJoinEvent = () => {
    setIsJoined(!isJoined);
  };

  const displayedPlayers = showAllPlayers ? event.playersJoined : event.playersJoined.slice(0, 4);
  const hasMorePlayers = event.playersJoined.length > 4;

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-zinc-950 rounded-lg shadow-2xl overflow-hidden border border-zinc-800">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-black via-red-950 to-black p-8 md:p-12 border-b border-red-900/30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-500" />
                <span className="text-sm font-semibold uppercase tracking-widest text-red-500">{event.sport}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">{event.name}</h1>
              <p className="text-gray-300 text-lg max-w-3xl">{event.description}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8 md:p-12">
            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Date & Time */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Date & Time</h3>
                </div>
                <p className="text-white font-medium mb-1">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-gray-400 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  {event.time} • {event.duration}
                </p>
              </div>

              {/* Location */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Location</h3>
                </div>
                <p className="text-white font-medium">{event.location}</p>
              </div>

              {/* Skill Level */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Skill Level</h3>
                </div>
                <p className="text-white font-medium mb-1">{event.skillLevel}</p>
                <p className="text-gray-400 text-sm">{event.equipment}</p>
              </div>

              {/* Organizer */}
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <User className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Organizer</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {event.creator.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{event.creator.name}</p>
                    <p className="text-gray-500 text-xs">{event.creator.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Players Section */}
            <div className="bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-800">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Participants</h2>
                    <p className="text-gray-400">{event.playersJoined.length} of {event.maxPlayers} spots filled</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
                    <span className="text-red-500 font-semibold">{event.maxPlayers - event.playersJoined.length}</span>
                    <span className="text-gray-400 text-sm ml-2">spots remaining</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-red-800 h-full transition-all duration-500"
                    style={{ width: `${(event.playersJoined.length / event.maxPlayers) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Player List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {displayedPlayers.map((player, index) => (
                  <div key={player.id} className="flex items-center gap-4 p-4 bg-black rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className={`w-12 h-12 ${
                      player.status === 'Organizer' 
                        ? 'bg-gradient-to-br from-red-600 to-red-800' 
                        : 'bg-gradient-to-br from-zinc-700 to-zinc-800'
                    } text-white rounded-full flex items-center justify-center font-semibold shadow-lg`}>
                      {player.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{player.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {player.status === 'Organizer' ? (
                          <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                            Organizer
                          </span>
                        ) : (
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < player.rating
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-zinc-700'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {player.status === 'Organizer' && (
                      <Star className="w-5 h-5 text-red-500 fill-red-500" />
                    )}
                  </div>
                ))}
              </div>

              {/* View More Button */}
              {hasMorePlayers && (
                <button
                  onClick={() => setShowAllPlayers(!showAllPlayers)}
                  className="w-full py-3 mb-6 rounded-lg font-medium text-sm bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700 transition-colors"
                >
                  {showAllPlayers ? 'View Less' : `View More (${event.playersJoined.length - 4} more)`}
                </button>
              )}

              {/* Join Button */}
              <button
                onClick={handleJoinEvent}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all shadow-lg ${
                  isJoined
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                    : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900'
                }`}
              >
                {isJoined ? 'Leave Event' : 'Join Event'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetail;