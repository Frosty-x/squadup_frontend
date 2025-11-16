import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import CreateGames from './pages/Creategames.jsx'
import FindPlayer from './pages/FindPlayer.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>  
    <BrowserRouter>
    <FindPlayer/>
  </BrowserRouter>
  </AuthProvider>
)