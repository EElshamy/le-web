export default {
  baseUrl: process.env.APP_BASE_URL || "http://localhost:3000",
  locales: [
    {
      code: "en",
      iso: "en-US",
      file: "en.yaml",
      dir: "ltr",
      name: "English",
    },
    {
      code: "ar",
      iso: "ar-EG",
      file: "ar.yaml",
      dir: "rtl",
      name: "العربية",
    },
  ],
  strategy: "prefix_except_default",
  defaultLocale: "ar",
  lazy: true,
  langDir: "../locales",
  detectBrowserLanguage: false,
  vueI18n: "./config/i18n.config.ts", // if you are using custom path, default
  strictMessage: false,
  compilation: {
    strictMessage: false,
  },
};
