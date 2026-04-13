import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { LangProvider } from './i18n/useLang.js'

// Telegram WebApp init — must be first
const tg = window.Telegram?.WebApp
if (tg) {
  tg.ready()
  tg.expand()
  tg.setSwipeBehavior?.({ allow_vertical_closing: false })
  tg.enableClosingConfirmation?.()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)
