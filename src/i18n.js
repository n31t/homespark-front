import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';
import translationKZ from './locales/kz.json';

// Ресурсы переводов
const resources = {
    En: {
        translation: translationEN
    },
    Ru: {
        translation: translationRU
    },
    Kz: {
        translation: translationKZ
    }
};

// Инициализация i18next
i18next
  // .use(LanguageDetector) // Опционально: для автоматического определения языка
  .use(initReactI18next) // Интеграция с React
  .init({
    resources,
    fallbackLng: 'Ru', // Язык по умолчанию
    interpolation: {
      escapeValue: false // React уже защищает от XSS
    }
  });

export const changeLanguage = (lang) => {
  i18next.changeLanguage(lang); // Меняет язык в i18next
};

export default i18next;