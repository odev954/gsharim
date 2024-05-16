import i18n from "i18next";
import resources from "languages";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const { arabicJson, hebrewJson, englishJson } = resources;
const languageDetector = new LanguageDetector(null, {
	order: ["localStorage", "cookie"],
	lookupCookie: "i18next",
	lookupLocalStorage: "i18next",
	caches: ["localStorage", "cookie"],
});

i18n
	.use(initReactI18next)
	.use(languageDetector)
	.init({
		debug: false,
		resources: {
			he: hebrewJson,
			ar: arabicJson,
			en: englishJson,
		},
		fallbackLng: "he",
	});

export default i18n;
