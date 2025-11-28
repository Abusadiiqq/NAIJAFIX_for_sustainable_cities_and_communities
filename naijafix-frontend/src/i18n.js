import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en.json';
import hausa from './locales/hausa.json';
import igbo from './locales/igbo.json';
import yoruba from './locales/yoruba.json';

const resources = {
  en: { translation: en },
  hausa: { translation: hausa },
  igbo: { translation: igbo }, 
  yoruba: { translation: yoruba }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;