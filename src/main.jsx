import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource-variable/onest';

console.log(import.meta.env.VITE_API_BACKEND_URL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <App />
  </StrictMode>,
)
