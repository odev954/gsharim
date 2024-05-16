import {
	completeFromList,
	Completion,
	ifNotIn,
} from "@codemirror/autocomplete";
import { pythonLanguage } from "@codemirror/lang-python";
import { linter, Diagnostic } from "@codemirror/lint";
import { Extension, StateEffect, StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { map } from "lodash-es";
import { ApiHintsMap, PythonError } from "../../types";
import { AutocompleteBoostNumber } from "./consts";

export function createErrorLinter(
	errorToRender: PythonError | undefined,
	view: EditorView | undefined
): Extension {
	return linter(() => {
		if (!errorToRender) {
			return [];
		}
		if (view) {
			const currentText = view.state.doc;
			const start =
				currentText.line(errorToRender.lineno).from + errorToRender.offset - 1;
			// in python -1 means to the end of the line, in exceptions that are not syntaxError, there the entire line is in error
			const end =
				errorToRender.end_offset !== -1
					? currentText.line(errorToRender.end_lineno).from +
					  errorToRender.end_offset
					: currentText.line(errorToRender.end_lineno).to;

			return [
				{
					from: start,
					to: end,
					severity: "error",
					source: errorToRender.msg,
				} as Diagnostic,
			];
		}
		return [];
	});
}

function apiAutocompleteOptions(api: ApiHintsMap): Completion[] {
	return map<ApiHintsMap, Completion>(api, (value, key) => ({
		type: "function",
		label: key,
		apply: `${key}()`,
		detail: value.docString,
		boost: AutocompleteBoostNumber,
	}));
}

export function autocompleteApiHint(api: ApiHintsMap): Extension {
	const autocompleteOptionsList = apiAutocompleteOptions(api);
	const completionSource = ifNotIn(
		["String", "Comment"],
		completeFromList(autocompleteOptionsList)
	);
	return pythonLanguage.data.of({
		autocomplete: completionSource,
	});
}

const highlightedLineDecoration = Decoration.line({
	attributes: { class: "cm-current-python-running-line" },
});
export const changeHighlight = StateEffect.define<{
	from: number;
} | null>();
export const highlighLines = StateField.define<DecorationSet>({
	create() {
		return Decoration.none;
	},
	update(currentSet, tr) {
		let returnValue = currentSet;
		tr.effects.forEach((effect) => {
			if (effect.is(changeHighlight)) {
				const effectValue = effect.value;
				returnValue = Decoration.none;
				if (effectValue !== null) {
					returnValue = returnValue.update({
						add: [highlightedLineDecoration.range(effectValue.from)],
					});
				}
			}
		});
		return returnValue;
	},
	provide(field) {
		return EditorView.decorations.from(field);
	},
});
