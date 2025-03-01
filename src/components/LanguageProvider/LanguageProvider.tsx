import React, { useContext, useEffect, useState } from 'react';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';

export type Language = 'ru' | 'en';
type LanguageContext = { language: Language; toggleLanguage: () => void };

export const LanguageContext = React.createContext<LanguageContext>({} as LanguageContext);

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState<Language>('ru');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ru' ? 'en' : 'ru'));
    if (language === 'ru') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
};
