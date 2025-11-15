import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function Step2Location() {
  const navigate = useNavigate();
  const { user, refreshUser,updateProfile } = useContext(AuthContext);
  
  const [city, setCity] = useState(user?.location?.city || '');
  const [address, setAddress] = useState(user?.location?.address || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSkip = () => {
    navigate('/onboarding/step3');
  };
    if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if(!user){
    return null
  }

  const handleNext = async () => {
    setLoading(true);
    setError('');

    try {
      await updateProfile({
        location: {
          city: city.trim() || undefined,
          address: address.trim() || undefined
        }
      })
      await refreshUser();
      navigate('/onboarding/step3');

    } catch (err) {
      console.log(err);
      setError('Failed to update location. Please try again.');
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-black mb-4">
          WHERE DO YOU <span className="text-red-600">PLAY?</span>
        </h1>
        <p className="text-gray-400 text-lg badscript">
          Help us connect you with nearby athletes
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Location Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
        
        {/* City Input */}
        <div>
          <label className="block text-lg font-bold text-white mb-3">
            City <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full bg-black border border-neutral-800 rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors duration-300"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 badscript">
            We'll match you with players in your city
          </p>
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-lg font-bold text-white mb-3">
            Address <span className="text-gray-500 text-sm font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-500" size={20} />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address or neighborhood (e.g., Downtown, Near Central Park)"
              rows={3}
              className="w-full bg-black border border-neutral-800 rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors duration-300 resize-none"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 badscript">
            This helps players find you more easily (kept private)
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
        <p className="text-sm text-gray-300 badscript">
          💡 <span className="font-semibold">Privacy Note:</span> Your exact address is never shared publicly. Only your city is visible to other players.
        </p>
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
          disabled={loading || !city.trim()}
          className="flex-1 bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

      {/* Navigation Hint */}
      {!city.trim() && (
        <p className="text-center text-sm text-gray-500 badscript">
          Enter a city to continue, or skip this step
        </p>
      )}
    </div>
  );
}