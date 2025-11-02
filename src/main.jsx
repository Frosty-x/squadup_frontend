import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Form from './pages/Form.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>  
    <BrowserRouter>
    <Form/>
  </BrowserRouter>
  </AuthProvider>
)