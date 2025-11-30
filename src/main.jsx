import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/ui/Navbar.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <App />
      <ToastContainer position="top-right"
      />
    </BrowserRouter>
  </AuthProvider>
)