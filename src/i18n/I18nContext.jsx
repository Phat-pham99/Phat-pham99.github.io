import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, MESSAGES } from './messages.js';

const STORAGE_KEY = 'portfolio-lang';
const I18nContext = createContext(null);

function isLanguage(value) {
  return LANGUAGES.includes(value);
}

function storedLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

function browserLanguage() {
  const preferred = (navigator.languages ?? [navigator.language]).map((code) => code?.split('-')[0].toLowerCase());
  return preferred.find(isLanguage) ?? 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const initial = document.documentElement.lang;
    return isLanguage(initial) ? initial : storedLanguage() ?? browserLanguage();
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = MESSAGES[lang].meta.title;
  }, [lang]);

  useEffect(() => {
    const syncStorage = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) setLang(storedLanguage() ?? browserLanguage());
    };
    window.addEventListener('storage', syncStorage);
    return () => window.removeEventListener('storage', syncStorage);
  }, []);

  const value = useMemo(() => {
    function setLanguage(next) {
      setLang(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        return;
      }
    }
    return { lang, t: MESSAGES[lang], setLanguage };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
