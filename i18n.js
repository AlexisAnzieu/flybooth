const locales = ["en", "fr", "de", "pt", "es"];
const defaultLocale = "en";

module.exports = {
  locales,
  defaultLocale,
  pages: {
    "*": ["main"],
  },
  loadLocaleFrom: (lang) =>
    import(`./locales/${lang}.json`).then((m) => m.default),
};
