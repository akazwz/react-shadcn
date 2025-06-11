export const supportedLocales = ["en", "zh"];

export const defaultLocale = "en";

export async function getTranslations(locale: string) {
	switch (locale) {
		case "en":
			return import("./en.json").then((module) => module.default);
		case "zh":
			return import("./zh.json").then((module) => module.default);
		default:
			return import("./en.json").then((module) => module.default);
	}
}
