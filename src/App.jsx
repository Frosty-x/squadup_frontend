import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';




const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
