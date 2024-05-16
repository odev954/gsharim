import { useEffect } from "react";
import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { changeHighlight, highlighLines } from "./utils";

export function useHighlightLine(
	currentLineNumber: number | null,
	view: EditorView | undefined
): Extension {
	useEffect(() => {
		if (!view) {
			return;
		}
		let currentLineDescriptor = null;
		if (
			currentLineNumber !== null &&
			currentLineNumber <= view.state.doc.lines
		) {
			const line = view.state.doc.line(currentLineNumber);
			currentLineDescriptor = { from: line.from };
			view.dispatch({
				selection: {
					anchor: line.from,
				},
				scrollIntoView: true,
			});
		}
		const effects = changeHighlight.of(currentLineDescriptor);
		view.dispatch({ effects });
	}, [currentLineNumber, view]);
	return highlighLines;
}
