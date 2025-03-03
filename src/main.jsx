import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {ContactState} from './Context/ContactState'
import { LoadingBarContainer } from "react-top-loading-bar";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContactState>
      <LoadingBarContainer>
      <App />
      </LoadingBarContainer>
    </ContactState>
    </BrowserRouter>
  </StrictMode>,
)
