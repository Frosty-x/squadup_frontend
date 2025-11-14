import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Dashboard from './pages/Dashboard';
import OnboardingLayout from './components/onboarding/OnboardingLayout';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      
      {/* Onboarding Routes */}
      <Route path="/onboarding/*" element={<OnboardingLayout />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
            
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;