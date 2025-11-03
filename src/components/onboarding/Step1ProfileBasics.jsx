import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, User, ChevronRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Step1ProfileBasics() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(user?.profilePic || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSkip = () => {
    navigate('/onboarding/step2');
  };

  const handleNext = async () => {
    setLoading(true);
    setError('');

    try {
      // Update user profile with bio (profilePic already has default)
      await api.put('/users/profile', {
        bio: bio.trim() || undefined,
        profilePic: profilePic || undefined
      });

      navigate('/onboarding/step2');
    } catch (err) {
      setError('Failed to update profile. Please try again.',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-black mb-4">
          SET UP YOUR <span className="text-red-600">PROFILE</span>
        </h1>
        <p className="text-gray-400 text-lg badscript">
          Let other athletes know who you are
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <label className="block text-lg font-bold text-white mb-4">
          Profile Picture
        </label>
        <div className="flex flex-col items-center gap-6">
          {/* Profile Pic Preview */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-neutral-800 border-4 border-red-700 overflow-hidden">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="text-gray-500" size={48} />
                </div>
              )}
            </div>
          </div>

          {/* Upload Info */}
          <div className="text-center">
            <p className="text-gray-400 text-sm badscript mb-2">
              Using default avatar. You can upload a custom picture later from settings.
            </p>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <label className="block text-lg font-bold text-white mb-4">
          Bio <span className="text-gray-500 text-sm font-normal">(Optional)</span>
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell other athletes about yourself, your favorite sports, playing style, or anything you'd like to share..."
          maxLength={500}
          rows={6}
          className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors duration-300 resize-none"
        />
        <div className="mt-2 text-right text-sm text-gray-500">
          {bio.length}/500 characters
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSkip}
          className="flex-1 border border-neutral-800 hover:border-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
        >
          SKIP FOR NOW
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              NEXT
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}