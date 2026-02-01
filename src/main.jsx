import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 👇 L'import Vercel Analytics (Indispensable)
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    
    {/* 👇 Le composant qui compte les visites */}
    <Analytics />
    
  </React.StrictMode>,
)