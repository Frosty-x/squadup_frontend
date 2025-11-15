import { useContext, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Trophy, Star, LogOut, User, Edit, Camera, Pencil, Underline } from 'lucide-react';

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

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
          {/* Profile Card */}
          <div className="bg-neutral-900 border  border-neutral-800 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">{user.name || 'Unknown'}</h2>
              {/* Avatar */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-neutral-800">
                <img src={user.profilePic}
                  alt="Profile"
                  className='size-46 rounded-full object-cover border-2'
                />
              </div>
              {/* player Bio */}
              <p className="text-white font-medium">{user.bio}</p>
            </div>
          </div>

          {/* Bio & Other Details */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Bio & other details</h3>
              <div
                onClick={() => navigate('/onboarding')}
                className='hover:text-gray-300 cursor-pointer'
              >
                <Pencil size={18} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Contact</p>
                  <p className="text-white font-extralight">{user.email}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">Sports Selected</p>
                  <p className="text-white font-extralight">
                    {user.sports && user.sports.length > 0
                      ? user.sports.map(s => s.name).join(", ")
                      : "No sports selected"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">My Preferred Sport</p>
                  <p className="text-white font-extralight">{user.location.city || "No City Selected"}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">Region</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    <MapPin size={16} className="text-blue-500" />
                    India
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">My Skill Level</p>
                  <p className="text-white font-extralight">
                    {user.sports && user.sports.length > 0
                      ? user.sports.map(sport => `${sport.skillLevel}`).join(", ")
                      : "Not selected"}
                  </p>

                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">Player Rating</p>
                  <p className="text-white font-medium">0.0</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">Match Attended</p>
                  <p className="text-white font-medium">5/8</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Availability</p>
                  <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Available to Play
                  </span>
                </div>

              </div>
              <Link to="/creategame">
                <button className="border border-red-800 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
                  CREATE GAMES
                </button>
              </Link>

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
                  <div className='space-y-3 text-sm font-bo'>
                    <div className='flex items-center justify-between py-3 border-b border-zinc-700/50'>
                      <span className='text-gray-300'>Member Since</span>
                      <span className='text-green-400'>{user?.createdAt?.split("T")[0]}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-300'>Account Status</span>
                      <span className={`inline-block py-1 rounded-full text-sm ${user.availability === 'Available'
                        ? ' text-green-400 '
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

            </div>
          </div>
        </div>


        {/* My Matches Table */}
        <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">My Matches</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Match Type</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Date</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Result</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="pt-8 text-center text-gray-500">
                    No matches played yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Quick Actions */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <button className="bg-red-700 hover:bg-red-800 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105">
            FIND PLAYERS
          </button>
          <button
            onClick={() => navigate('/sports')}
            className="bg-neutral-900 border-2 border-neutral-800 hover:border-red-700 text-white font-bold text-lg px-8 py-6 rounded-2xl transition-all duration-300 hover:scale-105">
            BROWSE GAMES
          </button>

        </div>
      </main>
    </div>
  );
}