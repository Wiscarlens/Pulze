/**
 * i18n Configuration
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import es from './es';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ht', name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
];

const resources = {
  en: { translation: en },
  es: { translation: es },
  // Additional languages would be added here
  // For now, fallback to English for unsupported languages
  ht: { translation: en },
  zh: { translation: en },
  vi: { translation: en },
  ko: { translation: en },
  ar: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export const changeLanguage = async (languageCode: string) => {
  await i18n.changeLanguage(languageCode);
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const isRTL = (languageCode: string) => {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
  return lang?.rtl || false;
};

export default i18n;
