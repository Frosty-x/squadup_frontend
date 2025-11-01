import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import Navbar from './pages/Navbar';
import LandingPage from './pages/Landingpage';

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
    </AuthProvider>
  )
}

export default App
