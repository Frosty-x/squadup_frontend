<<<<<<< HEAD
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Award, User, Shield, Star } from 'lucide-react';
=======
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Trophy, User, Shield, Award, Star } from 'lucide-react';
import gameService from '../services/gameService';
import { toast } from 'react-toastify';
>>>>>>> 01aeddd34ee1803075ccd5f935def2695405f6e3

const GameDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await gameService.getGameById(id);
        setEvent(response.data || response);
      } catch (err) {
        setError(err?.message || 'Failed to load game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);

  const handleJoinEvent = async () => {
    try {
      const response = await gameService.joinGame(id);
      toast.success(response.message || 'Successfully joined the game!');
      
      const updatedGame = await gameService.getGameById(id);
      setEvent(updatedGame.data || updatedGame);
      setIsJoined(true);
    } catch (error) {
      toast.error(error.message || 'Failed to join game');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-gray-400">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Game not found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const currentPlayers = event.currentPlayers || [];
  const displayedPlayers = showAllPlayers ? currentPlayers : currentPlayers.slice(0, 4);
  const hasMorePlayers = currentPlayers.length > 4;

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
<<<<<<< HEAD
      

        {/* Header Card */}
=======
>>>>>>> 01aeddd34ee1803075ccd5f935def2695405f6e3
        <div className="bg-zinc-950 rounded-lg shadow-2xl overflow-hidden border border-zinc-800">
          
          <div className="relative bg-gradient-to-r from-black via-red-950 to-black p-8 md:p-12 border-b border-red-900/30">
            <div className="absolute inset-0 "></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-500" />
                <span className="text-sm font-semibold uppercase tracking-widest text-red-500">{event.sport}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">{event.title}</h1>
              <p className="text-gray-300 text-lg max-w-3xl">{event.description || 'Join this exciting game and meet other players!'}</p>
            </div>
          </div>
          

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Date & Time</h3>
                </div>
                <p className="text-white font-medium mb-1">{formatDate(event.date)}</p>
                <p className="text-gray-400 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  {formatTime(event.date)} • {event.duration} minutes
                </p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Location</h3>
                </div>
                <p className="text-white font-medium">{event.location?.city || event.location}</p>
                {event.location?.address && (
                  <p className="text-gray-400 text-sm mt-1">{event.location.address}</p>
                )}
              </div>

              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Skill Level</h3>
                </div>
                <p className="text-white font-medium mb-1 capitalize">{event.skillLevel}</p>
                <p className="text-gray-400 text-sm">{event.equipment || 'Bring your own equipment'}</p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <User className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wide">Organizer</h3>
                </div>
                <div className="flex items-center gap-2">
                  {event.creator?.profilePic ? (
                    <img 
                      src={event.creator.profilePic} 
                      alt={event.creator.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-red-600"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {event.creator?.name?.charAt(0).toUpperCase() || 'O'}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium text-sm">{event.creator?.name || 'Organizer'}</p>
                    <p className="text-gray-500 text-xs">Game Creator</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-800">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Participants</h2>
                    <p className="text-gray-400">{currentPlayers.length} of {event.playersNeeded} spots filled</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
                    <span className="text-red-500 font-semibold">{event.playersNeeded - currentPlayers.length}</span>
                    <span className="text-gray-400 text-sm ml-2">spots remaining</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-red-800 h-full transition-all duration-500"
                    style={{ width: `${(currentPlayers.length / event.playersNeeded) * 100}%` }}
                  ></div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Player List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {displayedPlayers.map((player) => (
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
=======
              {currentPlayers.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {displayedPlayers.map((player, index) => {
                      const isOrganizer = player._id === event.creator?._id || player.id === event.creator?.id;
                      return (
                        <div key={player._id || player.id || index} className="flex items-center gap-4 p-4 bg-black rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                          {player.profilePic ? (
                            <img 
                              src={player.profilePic} 
                              alt={player.name || 'Player'}
                              className={`w-12 h-12 rounded-full object-cover shadow-lg ${
                                isOrganizer ? 'border-2 border-red-600' : 'border-2 border-zinc-700'
                              }`}
                            />
                          ) : (
                            <div className={`w-12 h-12 ${
                              isOrganizer
                                ? 'bg-gradient-to-br from-red-600 to-red-800' 
                                : 'bg-gradient-to-br from-zinc-700 to-zinc-800'
                            } text-white rounded-full flex items-center justify-center font-semibold shadow-lg`}>
                              {player.name?.charAt(0).toUpperCase() || 'P'}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-white">{player.name || 'Player'}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {isOrganizer ? (
                                <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                                  Organizer
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">Player</span>
                              )}
                            </div>
>>>>>>> 01aeddd34ee1803075ccd5f935def2695405f6e3
                          </div>
                          {isOrganizer && (
                            <Star className="w-5 h-5 text-red-500 fill-red-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {hasMorePlayers && (
                    <button
                      onClick={() => setShowAllPlayers(!showAllPlayers)}
                      className="w-full py-3 mb-6 rounded-lg font-medium text-sm bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700 transition-colors"
                    >
                      {showAllPlayers ? 'View Less' : `View More (${currentPlayers.length - 4} more)`}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-8 mb-6">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Be the first to join this game!</p>
                </div>
              )}

              <button
                onClick={handleJoinEvent}
                disabled={currentPlayers.length >= event.playersNeeded || isJoined}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all shadow-lg ${
                  currentPlayers.length >= event.playersNeeded || isJoined
                    ? 'bg-zinc-800 text-gray-500 cursor-not-allowed border border-zinc-700'
                    : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900'
                }`}
              >
<<<<<<< HEAD
                {isJoined ? 'Leave Game' : 'Join Game'}
=======
                {currentPlayers.length >= event.playersNeeded ? 'Game Full' : isJoined ? 'Already Joined' : 'Join Event'}
>>>>>>> 01aeddd34ee1803075ccd5f935def2695405f6e3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;