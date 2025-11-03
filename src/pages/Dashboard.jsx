import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Trophy, Star, LogOut, User, Edit } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-5 h-5 border-2 border-red-700 rotate-45"></div>
            <span className="text-2xl badscript tracking-wider text-white">
              SquadUp
            </span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-red-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            WELCOME BACK, <span className="text-red-600">{user.name?.toUpperCase()}</span>
          </h1>
          <p className="text-gray-400 text-lg badscript">
            Ready to find your next teammate?
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Profile</h2>
              <button
                onClick={() => navigate('/onboarding/step1')}
                className="flex items-center gap-2 text-red-600 hover:text-red-500 font-semibold text-sm transition-colors"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            </div>

            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="w-24 h-24 rounded-full bg-neutral-800 border-4 border-red-700 overflow-hidden shrink-0">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="text-gray-500" size={40} />
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="text-lg font-semibold text-white">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-white">{user.email}</p>
                </div>

                {user.bio && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bio</p>
                    <p className="text-gray-300 badscript">{user.bio}</p>
                  </div>
                )}

                {user.location?.city && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={18} className="text-red-600" />
                    <span>{user.location.city}</span>
                    {user.location.address && (
                      <span className="text-gray-500">• {user.location.address}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Stats</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-700/20 rounded-full flex items-center justify-center">
                    <Trophy className="text-red-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Games Played</p>
                    <p className="text-2xl font-bold text-white">{user.totalGamesPlayed || 0}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-700/20 rounded-full flex items-center justify-center">
                    <Star className="text-red-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Overall Rating</p>
                    <p className="text-2xl font-bold text-white">
                      {user.overallRating ? user.overallRating.toFixed(1) : '0.0'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <p className="text-sm text-gray-500 mb-2">Availability</p>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                  user.availability === 'Available' 
                    ? 'bg-green-900/30 text-green-400 border border-green-700' 
                    : user.availability === 'Busy'
                    ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                    : 'bg-red-900/30 text-red-400 border border-red-700'
                }`}>
                  {user.availability || 'Available'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sports Section */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-red-600" size={28} />
              Your Sports
            </h2>
            <button
              onClick={() => navigate('/onboarding/step3')}
              className="flex items-center gap-2 text-red-600 hover:text-red-500 font-semibold text-sm transition-colors"
            >
              <Edit size={18} />
              Manage Sports
            </button>
          </div>

          {user.sports && user.sports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.sports.map((sport, index) => (
                <div
                  key={index}
                  className="bg-black border border-neutral-800 rounded-lg p-6 hover:border-red-700 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{sport.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gray-500">Skill:</span>{' '}
                      <span className="font-semibold text-red-600">{sport.skillLevel}</span>
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">Rating:</span>{' '}
                      <span className="font-semibold text-white">
                        {sport.averageRating ? sport.averageRating.toFixed(1) : '0.0'} ⭐
                      </span>
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">Games:</span>{' '}
                      <span className="font-semibold text-white">{sport.gamesPlayed || 0}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 badscript mb-4">No sports added yet</p>
              <button
                onClick={() => navigate('/onboarding/step3')}
                className="bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                Add Your First Sport
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button className="bg-red-700 hover:bg-red-800 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105">
            FIND PLAYERS
          </button>
          <button className="bg-neutral-900 border-2 border-neutral-800 hover:border-red-700 text-white font-bold text-lg px-8 py-6 rounded-2xl transition-all duration-300 hover:scale-105">
            BROWSE GAMES
          </button>
        </div>
      </main>
    </div>
  );
}