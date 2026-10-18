import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../translations';
import type { Language, Translations } from '../translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('purandar_lang');
      if (saved === 'mr' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('purandar_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'mr' : 'en');
  };

  useEffect(() => {
    if (lang === 'mr') {
      document.body.classList.add('lang-mr');
      document.documentElement.lang = 'mr';
    } else {
      document.body.classList.remove('lang-mr');
      document.documentElement.lang = 'en';
    }
  }, [lang]);

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
