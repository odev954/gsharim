import { useEffect, useMemo, useState, useCallback } from "react";
import { Box } from "@mui/material";
import Editor from "@uiw/react-codemirror";
import { forceLinting, lintGutter } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import { theme } from "./theme";
import RunControlButtons from "../runControlButtons";
import { editorBox, editorConfiguration } from "./styles";
import { ApiHintsMap, PythonError } from "../../types";
import "./resizeableEditor.css";
import {
	EditorBasicSetup,
	ControlKeyName,
	EnterKeyName,
	EscapeKeyName,
} from "./consts";
import { autocompleteApiHint, createErrorLinter } from "./utils";
import { useHighlightLine } from "./hooks";

type ResizableEditorProps = {
	onChange: (text: string) => void;
	onRun: () => void;
	onStop: () => void;
	isRunning: boolean;
	isReady: boolean;
	defaultCode: string;
	error: PythonError | undefined;
	editable: boolean;
	api: ApiHintsMap;
	currentLine: number | null;
	disableUserRunCode?: boolean;
};

export default function ResizableEditor({
	onChange,
	onRun,
	onStop,
	isRunning,
	isReady,
	defaultCode,
	error,
	editable,
	api,
	currentLine,
	disableUserRunCode,
}: ResizableEditorProps): JSX.Element {
	const isEscapePressed = useKeyPress({ targetKey: EscapeKeyName });
	const isControlPressed = useKeyPress({ targetKey: ControlKeyName });
	const isEnterPressed = useKeyPress({ targetKey: EnterKeyName });
	const isControlAndEnterPressed = useMemo(
		() => isControlPressed && isEnterPressed,
		[isControlPressed, isEnterPressed]
	);
	const [view, setView] = useState<EditorView>();
	const [errorToRender, setErrorToRender] = useState<PythonError | undefined>();
	const highlightCurrentLineExtention = useHighlightLine(currentLine, view);

	useEffect(() => {
		setErrorToRender(error);
	}, [error]);

	useEffect(() => {
		if (isEscapePressed && isRunning && !disableUserRunCode) {
			onStop();
		}
	}, [isEscapePressed, isRunning, onStop, disableUserRunCode]);

	const runCode = useCallback(() => {
		onRun();
		if (view) {
			forceLinting(view);
		}
	}, [onRun, view]);

	useEffect(() => {
		if (
			isControlAndEnterPressed &&
			!isRunning &&
			isReady &&
			!disableUserRunCode
		) {
			runCode();
		}
		// not adding isRunning to the dependency list on purpose
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isControlAndEnterPressed, onRun, view, disableUserRunCode]);

	const errorLinter = useMemo(
		() => createErrorLinter(errorToRender, view),
		[errorToRender, view]
	);

	const editorExtentions = useMemo(() => {
		return [
			python(),
			autocompleteApiHint(api),
			errorLinter,
			lintGutter(),
			highlightCurrentLineExtention,
		];
	}, [api, errorLinter, highlightCurrentLineExtention]);

	const onTextChange = useCallback(
		(newValue: string) => {
			setErrorToRender(undefined);
			onChange(newValue);
		},
		[onChange]
	);

	const onMouseDown = useCallback(() => {
		setErrorToRender(undefined);
	}, []);

	return (
		<Box sx={editorBox}>
			<Editor
				onMouseDown={onMouseDown}
				extensions={editorExtentions}
				onChange={onTextChange}
				onCreateEditor={setView}
				// this is done beacuse this lib works only this way, must give width and height this way
				style={{ width: editorConfiguration.width }}
				height={editorConfiguration.height}
				theme={theme}
				basicSetup={EditorBasicSetup}
				value={defaultCode}
				editable={editable}
			/>
			{!disableUserRunCode && (
				<RunControlButtons
					onRun={runCode}
					onStop={onStop}
					isRunning={isRunning}
					isReady={isReady}
				/>
			)}
		</Box>
	);
}
