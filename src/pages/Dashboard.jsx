import { useContext, useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, LogOut, Pencil } from 'lucide-react';
import gameService from '../services/gameService';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const [myGames, setMyGames] = useState([])

  useEffect(() => {
  if (!loading) {
    if (!user) {
      navigate('/signin');
    } else {
      loadGames();   // load your games when the user exists
    }
  }
}, [user, loading, navigate]);

  const loadGames = async()=>{
    try {
      const response = await gameService.getMyGames()
      setMyGames(response)
      
    } catch (error) {
      console.log("Error loading Games",error);
      
    }
  }

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
                  <p className="text-gray-500 text-sm mb-2 border-b border-neutral-700">Availability</p>
                   <span className="text-gray-500 text-sm">
                    Member Since : {user?.createdAt?.split("T")[0]} 
                  </span><br />
                  <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mt-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Available to Play
                  </span>
                </div>

              </div>
             <Link to="/creategame">
                <button className="cursor-pointer border border-red-900 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
                  CREATE GAMES
                </button>
              </Link>


            </div>
          </div>
        </div>


        {/* My Matches Table */}
        <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">My Games</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Match Name</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Duration</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Skill Level</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Location</th>
                  <th className="text-left text-gray-500 text-sm font-medium pb-3">Players</th>
                </tr>
              </thead>
              <tbody>
                {myGames.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="pt-8 text-center text-gray-500">
                      No game created yet
                    </td>
                  </tr>
                ) : (
                  myGames.map((game) => (
                    <tr key={game._id} className="border-b border-neutral-800">
                      <td className="py-3">{game.sport}</td>
                      <td className="py-3">{game.duration} mins</td>
                      <td className="py-3">{game.skillLevel}</td>
                      <td className="py-3">{game.location?.city}</td>
                      <td className="py-3">
                        {game.currentPlayers?.length}/{game.maxPlayers}
                      </td>
                    </tr>
                  ))
                )}
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