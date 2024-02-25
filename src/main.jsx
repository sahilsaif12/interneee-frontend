import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'animate.css';
import AppState from './context/AppState.jsx';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter } from 'react-router-dom';


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '20px',
  transition: transitions.SCALE
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>

  <BrowserRouter>
  <AppState>

    <App />
  </AppState>
  </BrowserRouter>
  </AlertProvider>
  </React.StrictMode>,
)
