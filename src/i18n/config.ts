import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation_en.json';
import translationRu from './ru/translation_ru.json';


const resources = {
    en: {
        translation: translationEn
        },
    ru: {
      translation: translationRu
    },
  };
  
  i18next.use(initReactI18next).init({
    lng: 'ru',
    resources,
  });