import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './Components/Context/Contextapi.jsx'
import AuthContext from './Components/Context/Authcontext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthContext><Contextapi>  <BrowserRouter>  <App /></BrowserRouter></Contextapi></AuthContext>
  </StrictMode>,
)
