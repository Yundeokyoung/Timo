import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Register.css'
import App from './App.jsx'
import Register from './components/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Register />
  </StrictMode>,
)
