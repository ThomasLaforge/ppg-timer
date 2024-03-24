import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-electron-language-detector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
        "home.app-title": "PPG Timer",
        "home.import-label": "Id to import routine",
        "home.import-btn": "Import",
        "home.training-history-title": "training list",
        "home.welcome.annouce": "Welcome on PPG Timer. You will be able to create, share, import and execute any training you wish.",
        "home.welcome.initial-actions-sentence": "You can create your own training from scratch, or you can start from an existing one by copy pasting the training code and import it.",
        "home.welcome.creation-link": "Create new training"
    }
  },
  fr: {
    translation: {
        "home.app-title": "PPG Timer",
        "home.import-label": "Saisissez le code d'importation",
        "home.import-btn": "Importer",
        "home.training-history-title": "liste des entrainements",
        "home.welcome.annouce": "Bienvenue sur l'application PPG Timer. Ici, tu vas pouvoir créer, partager, importer et réaliser les entrainements de ton choix !",
        "home.welcome.initial-actions-sentence": "Tu peux créer ton propre entrainement de zéro, ou tu peux en utiliser un déjà existant en l'important grâce à son code.",
        "home.welcome.creation-link": "Créer un entrainement"
    }
  }
};

i18n
    // .use(LanguageDetector)
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