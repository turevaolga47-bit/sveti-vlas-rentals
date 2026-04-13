import React, { createContext, useContext, useState, useCallback } from 'react'
import ru from './ru.js'
import en from './en.js'
import de from './de.js'

const LANGS = { ru, en, de }
const LANG_KEY = 'svlas_lang'

const LANG_META = {
  ru: { flag: '🇷🇺', label: 'Рус' },
  en: { flag: '🇬🇧', label: 'Eng' },
  de: { flag: '🇩🇪', label: 'Deu' },
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved && LANGS[saved]) return saved
    // Автоопределение по Telegram или браузеру
    const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code
    if (tgLang) {
      if (tgLang.startsWith('de')) return 'de'
      if (tgLang.startsWith('en')) return 'en'
    }
    const browserLang = navigator.language || ''
    if (browserLang.startsWith('de')) return 'de'
    if (browserLang.startsWith('en')) return 'en'
  } catch {}
  return 'ru'
}

export const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((code) => {
    setLangState(code)
    try { localStorage.setItem(LANG_KEY, code) } catch {}
  }, [])

  const t = LANGS[lang]

  return React.createElement(LangContext.Provider, { value: { lang, setLang, t, LANG_META } }, children)
}

export function useLang() {
  return useContext(LangContext)
}
