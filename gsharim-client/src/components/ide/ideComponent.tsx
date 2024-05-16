import { useMemo, lazy } from "react";
import { Box } from "@mui/material";
import { ApiDescription } from "components/ide";
import * as styles from "./styles";
import IdeOutput from "./components/ideOutput";
import { PythonError, OutputLine } from "./types";
import ApiHints from "./components/apiHints";
import { getHintsOnly } from "./utils";
import { OutputOpenIdeMaxHeight, OutputCloseIdeMaxHeight } from "./consts";

const ResizableEditor = lazy(() => import("./components/resizableEditor"));

type IdeComponentProps = {
	handleChange: (code: string | undefined) => void;
	onRun: () => void;
	onStop: () => void;
	outputText: OutputLine[];
	defaultCode: string;
	error: PythonError | undefined;
	isReady: boolean;
	isRunning: boolean;
	isAcceptingInput: boolean;
	api: ApiDescription;
	onInputSubmit: (value: string) => void;
	editable: boolean;
	currentLine: number | null;
	autoRunMode?: boolean;
	hideRunningButtons?: boolean;
};
export default function IdeComponent({
	handleChange,
	onRun,
	onStop,
	outputText,
	defaultCode,
	error,
	isReady,
	isRunning,
	isAcceptingInput,
	onInputSubmit,
	api,
	editable,
	currentLine,
	autoRunMode,
	hideRunningButtons,
}: IdeComponentProps): JSX.Element {
	const showIdeOutput = useMemo(() => {
		return outputText.length > 0 || isAcceptingInput;
	}, [outputText, isAcceptingInput]);
	const apiHints = useMemo(() => getHintsOnly(api), [api]);
	const maxHeight = showIdeOutput
		? OutputOpenIdeMaxHeight
		: OutputCloseIdeMaxHeight;
	const effectiveEditable = !autoRunMode && editable;
	const disableUserRunCode = autoRunMode || hideRunningButtons;
	return (
		<Box sx={[styles.container]}>
			<Box sx={styles.ideContainer} maxHeight={maxHeight}>
				<ApiHints api={apiHints} />
				<ResizableEditor
					onChange={handleChange}
					onRun={onRun}
					onStop={onStop}
					isRunning={isRunning}
					isReady={isReady}
					defaultCode={defaultCode}
					error={error}
					editable={effectiveEditable}
					api={apiHints}
					currentLine={currentLine}
					disableUserRunCode={disableUserRunCode}
				/>
			</Box>
			{showIdeOutput && (
				<Box sx={styles.ideOutputContainer}>
					<IdeOutput
						text={outputText}
						isAcceptingInput={isAcceptingInput}
						onInputSubmit={onInputSubmit}
					/>
				</Box>
			)}
		</Box>
	);
}
