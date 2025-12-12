import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '../i18n';
import { getTranslation } from '../i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tp: (productId: string, fallbackName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'de';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string) => {
    return getTranslation(language, key as any);
  };

  const tp = (productId: string, fallbackName: string) => {
    const translated = getTranslation(language, productId as any);
    return translated !== productId ? translated : fallbackName;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tp }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
