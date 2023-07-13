import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './Locales/en.json';
import translationEs from './Locales/es.json';
import translationEu from './Locales/eu.json';

i18n.use(initReactI18next).init({
    lng: 'eu', // Default language
    fallbackLng: 'eu', // Fallback language if translation is missing
    resources: {
        en: {
            translation: translationEn, // English translations from en.json
        },
        es: {
            translation: translationEs, // Spanish translations from es.json
        },
        eu:{
            translation: translationEu, // Basque translations from eu.json
        }
        // Add translations for other languages
    },
});

export default i18n;
