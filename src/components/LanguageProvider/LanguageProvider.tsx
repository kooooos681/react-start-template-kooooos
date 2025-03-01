import React, { useContext, useEffect, useState } from 'react';
import '../../i18n/config';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
//import { Context, Lang, Theme } from './Context';

// function App() {
//   const { t, i18n } = useTranslation();

//   const count = 3;

// //  type Lang = 'ru' | 'en';
//   const [lang, setLang] = useState('ru');

//   const toggleLang = () => {
//     setLang((prevLang) => (prevLang === 'ru' ? 'en' : 'ru'));
//     if (lang === 'ru') {
//       i18n.changeLanguage('en');
//     } else {
//       i18n.changeLanguage('ru');
//     }
//   };


export type Language = 'ru' | 'en';
type LanguageContext = { language: Language; toggleLanguage: () => void };

export const LanguageContext = React.createContext<LanguageContext>({} as LanguageContext);

 export const useLanguage = () => useContext(LanguageContext);
 
interface LanguageProviderProps {
  children: React.ReactNode;
}


  export const LanguageProvider = ({ children }: LanguageProviderProps) => {

    const { t, i18n } = useTranslation();

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
  }, [language]);
  
    return (
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        { children }
      </LanguageContext.Provider>
    );
  };
