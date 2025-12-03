import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Shield, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';

const MatchHistory = () => {
  const [expandedMatch, setExpandedMatch] = useState(null);

  // Sample match data
  const matches = [
    {
      _id: '1',
      title: "Summer Championship Finals",
      sport: "Basketball",
      date: "2024-11-15T18:00:00Z",
      duration: 90,
      location: { city: "Downtown Arena", address: "123 Main St" },
      skillLevel: "intermediate",
      playersNeeded: 10,
      creator: { _id: 'creator1', name: "John Doe", profilePic: null },
      currentPlayers: [
        { _id: 'creator1', name: 'John Doe', profilePic: null },
        { _id: 'p2', name: 'Jane Smith', profilePic: null },
        { _id: 'p3', name: 'Mike Johnson', profilePic: null },
        { _id: 'p4', name: 'Sarah Williams', profilePic: null },
        { _id: 'p5', name: 'Tom Anderson', profilePic: null },
      ]
    },
    {
      _id: '2',
      title: "Regional Qualifier Match",
      sport: "Soccer",
      date: "2024-11-08T15:30:00Z",
      duration: 60,
      location: { city: "City Stadium", address: "456 Oak Ave" },
      skillLevel: "advanced",
      playersNeeded: 12,
      creator: { _id: 'creator2', name: "Alex Brown", profilePic: null },
      currentPlayers: [
        { _id: 'creator2', name: 'Alex Brown', profilePic: null },
        { _id: 'p6', name: 'Chris Lee', profilePic: null },
        { _id: 'p7', name: 'David Martinez', profilePic: null },
        { _id: 'p8', name: 'Emily Chen', profilePic: null },
      ]
    },
    {
      _id: '3',
      title: "Weekly Tournament Game",
      sport: "Tennis",
      date: "2024-11-01T10:00:00Z",
      duration: 45,
      location: { city: "Tennis Club", address: "789 Park Blvd" },
      skillLevel: "beginner",
      playersNeeded: 4,
      creator: { _id: 'creator3', name: "Emma Davis", profilePic: null },
      currentPlayers: [
        { _id: 'creator3', name: 'Emma Davis', profilePic: null },
        { _id: 'p9', name: 'Tom Wilson', profilePic: null },
        { _id: 'p10', name: 'Lisa Taylor', profilePic: null },
      ]
    },
    {
      _id: '4',
      title: "Friday Night Pickup Game",
      sport: "Volleyball",
      date: "2024-10-25T19:00:00Z",
      duration: 75,
      location: { city: "Beach Court", address: "Seaside Blvd" },
      skillLevel: "intermediate",
      playersNeeded: 8,
      creator: { _id: 'creator4', name: "Ryan Cooper", profilePic: null },
      currentPlayers: [
        { _id: 'creator4', name: 'Ryan Cooper', profilePic: null },
        { _id: 'p11', name: 'Jessica White', profilePic: null },
        { _id: 'p12', name: 'Kevin Brown', profilePic: null },
      ]
    },
    {
      _id: '5',
      title: "League Match Day 5",
      sport: "Basketball",
      date: "2024-10-18T17:00:00Z",
      duration: 60,
      location: { city: "Community Center", address: "100 Sports Way" },
      skillLevel: "advanced",
      playersNeeded: 10,
      creator: { _id: 'creator5', name: "Marcus Johnson", profilePic: null },
      currentPlayers: [
        { _id: 'creator5', name: 'Marcus Johnson', profilePic: null },
        { _id: 'p13', name: 'Amanda Green', profilePic: null },
      ]
    },
    {
      _id: '6',
      title: "Morning Practice Session",
      sport: "Cricket",
      date: "2024-10-12T08:00:00Z",
      duration: 120,
      location: { city: "Sports Complex", address: "Cricket Ground" },
      skillLevel: "intermediate",
      playersNeeded: 11,
      creator: { _id: 'creator6', name: "Raj Patel", profilePic: null },
      currentPlayers: [
        { _id: 'creator6', name: 'Raj Patel', profilePic: null },
        { _id: 'p14', name: 'Priya Sharma', profilePic: null },
      ]
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const toggleExpanded = (matchId) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Match History</h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg">Complete record of your games and events</p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {matches.map((match) => {
            const isExpanded = expandedMatch === match._id;

            return (
              <div 
                key={match._id}
                className="bg-zinc-950 rounded-lg shadow-xl overflow-hidden border border-zinc-800 hover:border-red-500/50 transition-all"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-black via-red-950/30 to-black p-3 md:p-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                      {match.sport}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white line-clamp-2">
                    {match.title}
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-3 md:p-4 space-y-2.5 md:space-y-3">
                  {/* Date & Time */}
                  <div className="bg-zinc-900 p-2.5 md:p-3 rounded-lg border border-zinc-800">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                      <span className="text-xs text-gray-500 uppercase font-medium">Date</span>
                    </div>
                    <p className="text-white font-medium text-xs md:text-sm">{formatDate(match.date)}</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(match.date)}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="bg-zinc-900 p-2.5 md:p-3 rounded-lg border border-zinc-800">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                      <span className="text-xs text-gray-500 uppercase font-medium">Location</span>
                    </div>
                    <p className="text-white font-medium text-xs md:text-sm">{match.location.city}</p>
                    {match.location.address && (
                      <p className="text-gray-400 text-xs mt-1 line-clamp-1">{match.location.address}</p>
                    )}
                  </div>

                  {/* Skill Level & Players */}
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="bg-zinc-900 p-2.5 md:p-3 rounded-lg border border-zinc-800">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                        <span className="text-xs text-gray-500 uppercase font-medium">Skill</span>
                      </div>
                      <p className="text-white font-medium text-xs md:text-sm capitalize">{match.skillLevel}</p>
                      <p className="text-gray-400 text-xs mt-1">{match.duration} min</p>
                    </div>

                    <div className="bg-zinc-900 p-2.5 md:p-3 rounded-lg border border-zinc-800">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                        <span className="text-xs text-gray-500 uppercase font-medium">Players</span>
                      </div>
                      <p className="text-white font-medium text-xs md:text-sm">
                        {match.currentPlayers.length} / {match.playersNeeded}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">Joined</p>
                    </div>
                  </div>

                  {/* View Players Button */}
                  <button
                    onClick={() => toggleExpanded(match._id)}
                    className="w-full py-2 md:py-2.5 rounded-lg font-medium text-xs md:text-sm bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        Hide Players <ChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </>
                    ) : (
                      <>
                        View Players <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Players Section */}
                {isExpanded && (
                  <div className="bg-black border-t border-zinc-800 p-3 md:p-4">
                    <h3 className="text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                      Participants ({match.currentPlayers.length})
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {match.currentPlayers.map((player) => {
                        const isMatchOrganizer = player._id === match.creator?._id;
                        return (
                          <div 
                            key={player._id}
                            className="flex items-center gap-2 md:gap-3 p-2 md:p-2.5 bg-zinc-900 rounded-lg border border-zinc-800"
                          >
                            {player.profilePic ? (
                              <img 
                                src={player.profilePic} 
                                alt={player.name}
                                className={`w-7 h-7 md:w-8 md:h-8 rounded-full object-cover ${
                                  isMatchOrganizer ? 'border-2 border-red-600' : ''
                                }`}
                              />
                            ) : (
                              <div className={`w-7 h-7 md:w-8 md:h-8 ${
                                isMatchOrganizer
                                  ? 'bg-gradient-to-br from-red-600 to-red-800'
                                  : 'bg-gradient-to-br from-zinc-700 to-zinc-800'
                              } text-white rounded-full flex items-center justify-center font-semibold text-xs`}>
                                {player.name?.charAt(0).toUpperCase() || 'P'}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white text-xs md:text-sm truncate">{player.name}</p>
                              {isMatchOrganizer && (
                                <span className="text-xs px-1.5 md:px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 inline-block mt-0.5">
                                  Organizer
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;