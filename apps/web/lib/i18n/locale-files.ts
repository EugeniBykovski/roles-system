import { BackendModule, CallbackError } from "i18next";
import { Namespaces, LocaleCode } from "./locale-types";

export const loadLocaleFiles: BackendModule = {
  type: "backend",
  async read<Namespace extends keyof typeof Namespaces>(
    language: LocaleCode,
    namespace: Namespace,
    callback: (
      err: CallbackError,
      translations: null | (typeof Namespaces)[Namespace]
    ) => void
  ) {
    try {
      let resources = await import(`./locales/${language}/${namespace}.json`);

      if (process.env["VITE_SPECIFIC_CODE"]) {
        resources = resources.default ?? resources;
      }

      callback(null, resources);
    } catch (error) {
      callback(error as CallbackError, null);
    }

    return "done";
  },

  init() {},
};
