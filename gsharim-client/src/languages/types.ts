import { componentsStrings } from "./hebrew/componentsStrings";
import { contextsStrings } from "./hebrew/contextsStrings";
import { hebrewJson } from "./hebrew/hebrew";
import { hooksStrings } from "./hebrew/hooksStrings";
import { pagesStrings } from "./hebrew/pagesStrings";

export type TranslateObject = typeof hebrewJson;

export type Resources = {
	hebrewJson: TranslateObject;
	arabicJson: TranslateObject;
	englishJson: TranslateObject;
};

export type ComponentsTranslationTree = typeof componentsStrings;

export type ContextTranslationTree = typeof contextsStrings;

export type HooksTranslationTree = typeof hooksStrings;

export type PagesTranslationTree = typeof pagesStrings;
