import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-electron-language-detector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
        "home.app-title": "PPG Timer",
        "home.import-label": "Id to import routine",
        "home.import-btn": "Import"
    }
  },
  fr: {
    translation: {
        "home.app-title": "PPG Timer",
        "home.import-label": "Saisissez le code d'importation",
        "home.import-btn": "Importer"
    }
  }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: 'en',
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
        escapeValue: false // react already safes from xss
        }
    });

  export default i18n;