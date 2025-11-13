import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Trophy, Star, LogOut, Camera, Pencil } from 'lucide-react';

const Header = ({ onLogout, onLogoClick }) => (
  <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
      <button 
        onClick={onLogoClick}
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      >
        <div className="w-5 h-5 border-2 border-red-700 rotate-45" />
        <span className="text-2xl badscript tracking-wider text-white">
          SquadUp
        </span>
      </button>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-neutral-800 hover:bg-red-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  </header>
);

const ProfileCard = ({ user, selectedImage, onImageUpload, isUploading }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-1">{user.name || 'Unknown'}</h2>
      <div className="relative inline-block mb-6">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-neutral-800">
          <img 
            src={selectedImage || user.profilePic || 'https://i.pinimg.com/736x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg'} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-2 right-2 bg-gray-900 p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
        >
          <Camera className="w-6 h-6 text-gray-100" />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={onImageUpload}
            disabled={isUploading}
          />
        </label>
      </div>
      <p className="text-white font-medium text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae impedit amet, assumenda commodi eligendi maxime.
      </p>
    </div>
  </div>
);

const InfoItem = ({ label, value, icon }) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="text-white font-medium flex items-center gap-2">
      {icon}
      {value}
    </p>
  </div>
);

const BioSection = ({ user, onNavigate }) => (
  <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold">Bio & other details</h3>
      <div className='flex items-center'>
        <Pencil className='size-4 '/>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
      <div className="space-y-6">
        <InfoItem label="Contact" value="Lorem ipsum dolor sit." />
        <InfoItem label="Sports Selected" value="x,y,z" />
        <InfoItem label="My Preferred Sport" value="x" />
        <InfoItem 
          label="Region" 
          value="India" 
          icon={<MapPin size={16} className="text-blue-500" />}
        />
      </div>
      <div className="space-y-6">
        <InfoItem label="My Skill Level" value="Advanced" />
        <InfoItem label="Player Rating" value="0.0" />
        <InfoItem label="Match Attended" value="5/8" />
        <div>
          <p className="text-gray-500 text-sm mb-2">Availability</p>
          <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Available to Play
          </span>
        </div>
      </div>
      <button 
        onClick={onNavigate}
        className="border border-red-800 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
      >
        CREATE GAMES
      </button>
    </div>
  </div>
);

const StatsCard = ({ user }) => {
  const availabilityColor = useMemo(() => {
    if (user.availability === 'Available') return 'text-green-400';
    if (user.availability === 'Busy') return 'text-yellow-400';
    return 'text-red-400';
  }, [user.availability]);

  const memberSince = useMemo(() => 
    user?.createdAt?.split("T")[0] || 'N/A',
    [user?.createdAt]
  );
 
};

const MatchesTable = () => (
  <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
    <h3 className="text-2xl font-bold text-white mb-6">My Matches</h3>
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
);

const QuickActions = ({ onFindPlayers, onBrowseGames }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <button 
      onClick={onFindPlayers}
      className="bg-red-700 hover:bg-red-800 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105"
    >
      FIND PLAYERS
    </button>
    <button 
      onClick={onBrowseGames}
      className="bg-neutral-900 border-2 border-neutral-800 hover:border-red-700 text-white font-bold text-lg px-8 py-6 rounded-2xl transition-all duration-300 hover:scale-105"
    >
      BROWSE GAMES  
    </button>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, loading, updateProfilePic } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfilePic({ profilePic: base64Image });
        setIsUploading(false);
      };

      reader.onerror = () => {
        console.error('Failed to read file');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  }, [updateProfilePic]);

  const handleNavigateHome = useCallback(() => navigate('/'), [navigate]);
  const handleNavigateSports = useCallback(() => navigate('/sports'), [navigate]);
  const handleFindPlayers = useCallback(() => {
    // Add navigation logic
    console.log('Find players');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onLogout={handleLogout} onLogoClick={handleNavigateHome} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">
            WELCOME BACK, <span className="text-red-600">{user.name?.toUpperCase()}</span>
          </h1>
          <p className="text-gray-400 text-lg badscript">
            Ready to find your next teammate?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileCard 
            user={user}
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            isUploading={isUploading}
          />
          <BioSection user={user} onNavigate={handleNavigateSports} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <StatsCard user={user} />
          <MatchesTable />
        </div>
        <QuickActions 
          onFindPlayers={handleFindPlayers}
          onBrowseGames={handleNavigateSports}
        />
      </main>
    </div>
  );
}