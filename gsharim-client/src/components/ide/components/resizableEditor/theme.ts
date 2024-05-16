import { Extension } from "@codemirror/state";
import { tags as t } from "@lezer/highlight";
import { createTheme, CreateThemeOptions } from "@uiw/codemirror-themes";

export const EditorTheme = (
	options?: Partial<CreateThemeOptions>
): Extension => {
	const { theme = "dark", settings = {}, styles = [] } = options || {};
	return createTheme({
		theme,
		settings: {
			background: "#2B2B2B",
			foreground: "#f8f8f2",
			caret: "#FFFFFF",
			selection: "rgba(255, 255, 255, 0.1)",
			selectionMatch: "rgba(255, 255, 255, 0.2)",
			gutterBackground: "rgba(255, 255, 255, 0.1)",
			gutterForeground: "#999",
			gutterBorder: "transparent",
			lineHighlight: "rgba(255, 255, 255, 0.1)",
			...settings,
		},
		styles: [
			{ tag: [t.comment], color: "#61A151" },
			{ tag: [t.className, t.propertyName], color: "#d2a8ff" },
			{ tag: [t.variableName, t.operator], color: "#A9B7C6" },
			{ tag: [t.keyword], color: "#CC7832" },
			{ tag: [t.string], color: "#6A8759" },
			{ tag: [t.name, t.quote], color: "#7ee787" },
			{ tag: [t.heading], color: "#d2a8ff", fontWeight: "bold" },
			{ tag: [t.emphasis], color: "#d2a8ff", fontStyle: "italic" },
			{ tag: [t.deleted], color: "#ffdcd7", backgroundColor: "ffeef0" },
			{ tag: [t.atom, t.number], color: "#bd93f9" },
			{ tag: t.link, textDecoration: "underline" },
			{ tag: t.strikethrough, textDecoration: "line-through" },
			{ tag: t.invalid, color: "#f97583" },
			{ tag: [t.meta, t.className], color: "#A9B7C6" },
			{ tag: [t.propertyName], color: "#FFC66D" },
			{ tag: [t.tagName], color: "#ff79c6" },
			{ tag: [t.typeName], color: "#ffb86c" },
			{
				tag: [t.function(t.variableName), t.function(t.propertyName)],
				color: "#fdbc2e",
			},
			...styles,
		],
	});
};

export const theme = EditorTheme();
