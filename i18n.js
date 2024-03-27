const countries = [
  {
    code: "cn",
    name: "中文",
    flag: "🇨🇳",
  },
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
    code: "it",
    name: "Italiano",
    flag: "🇮🇹",
  },
  {
    code: "pt",
    name: "Português",
    flag: "🇵🇹",
  },
  {
    code: "ru",
    name: "Русский",
    flag: "🇷🇺",
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
    import(`@/locales/${lang}.json`).then((m) => m.default),
};
