const countries = [
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
  },
  {
    code: "pt",
    name: "Português",
    flag: "🇵🇹",
  },
];

const locales = countries.map((country) => country.code);
const defaultLocale = "en";

module.exports = {
  countries,
  locales,
  defaultLocale,
  pages: {
    "*": ["main"],
  },
  loadLocaleFrom: (lang) =>
    import(`./locales/${lang}.json`).then((m) => m.default),
};
