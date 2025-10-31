import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LandingPage/>
  </BrowserRouter>
)