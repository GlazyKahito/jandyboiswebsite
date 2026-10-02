'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  translations: {},
});

export function LanguageProvider({ children, initialTranslations = {} }) {
  const [language, setLanguageState] = useState('en');
  const [translations, setTranslations] = useState(initialTranslations);

  useEffect(() => {
    const saved = localStorage.getItem('jandy_preferred_lang');
    if (saved && ['en', 'mr', 'hi'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang) => {
    if (['en', 'mr', 'hi'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('jandy_preferred_lang', lang);
    }
  };

  const t = (key) => {
    if (!translations || !translations[key]) return key;
    const entry = translations[key];
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations, setTranslations }}>
      <div className={language === 'mr' || language === 'hi' ? 'font-devanagari-active' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
