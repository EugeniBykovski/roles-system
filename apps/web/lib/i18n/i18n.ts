import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/app.json";

export enum Namespaces {
  app = "app",
}

const LANG_KEY = "appLang";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      [Namespaces.app]: en,
    },
  },
  lng:
    (typeof window !== "undefined" && localStorage.getItem(LANG_KEY)) || "en",
  fallbackLng: "en",
  defaultNS: Namespaces.app,
  ns: Object.values(Namespaces),
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV !== "production",
});

export default i18n;
