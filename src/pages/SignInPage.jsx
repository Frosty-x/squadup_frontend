import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Home } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // handle input changes and clear errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate email and password
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const user = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      // Check if user needs to complete onboarding
      if (!user.sports || user.sports.length === 0 || !user.location?.city) {
        navigate('/onboarding/step1');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Invalid email or password. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden flex items-center justify-center px-6 py-12 relative">
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <Home size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm group-hover:-translate-x-1 transition-transform duration-300 font-semibold">
          Home
        </span>
      </button>

      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-6 h-6 border-2 border-red-700 rotate-45"></div>
          <span className="text-3xl badscript tracking-wider text-white">SquadUp</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-black mb-3">
            WELCOME <span className="text-red-600">BACK</span>
          </h1>
          <p className="text-gray-400 badscript">Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400 text-sm">
              {errors.submit}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full bg-neutral-900 border ${
                  errors.email ? 'border-red-700' : 'border-neutral-800'
                } rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors duration-300`}
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-300">Password</label>
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-500 font-semibold transition-colors"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full bg-neutral-900 border ${
                  errors.password ? 'border-red-700' : 'border-neutral-800'
                } rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              <>
                SIGN IN
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 badscript">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-red-600 hover:text-red-500 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}