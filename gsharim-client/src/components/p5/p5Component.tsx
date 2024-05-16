import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import { Box, CircularProgress } from "@mui/material";
import Ide, { ApiDescription } from "components/ide";
import { UseQueryResult } from "@tanstack/react-query";
import { SplitPane } from "react-collapse-pane";
import * as styles from "./styles";

type P5ComponentProps = {
	fetchSketchResult: UseQueryResult<Sketch>;
	containIde: boolean;
	api: ApiDescription;
	pythonSuffix?: string;
	autoAwait?: boolean;
	defaultCode?: string;
	editable?: boolean;
	maxOutputSize?: number;
	verboseDelay?: number;
	autoRun?: boolean;
	userPrefix?: string;
};
export default function P5Component({
	fetchSketchResult,
	containIde,
	api,
	pythonSuffix,
	autoAwait,
	defaultCode,
	editable,
	maxOutputSize,
	verboseDelay,
	autoRun,
	userPrefix,
}: P5ComponentProps): JSX.Element {
	if (fetchSketchResult.isLoading) {
		return <CircularProgress />;
	}

	if (containIde) {
		return (
			<Box sx={styles.container}>
				<SplitPane split="horizontal">
					<Box sx={styles.sketchContainer}>
						<ReactP5Wrapper sketch={fetchSketchResult.data} />
					</Box>
					<Box sx={styles.ideContainer}>
						<Ide
							api={api}
							pythonSuffix={pythonSuffix}
							pythonPrefix={userPrefix}
							autoAwait={autoAwait}
							defaultCode={defaultCode}
							editable={editable}
							maxOutputSize={maxOutputSize}
							verboseDelay={verboseDelay}
							autoRun={autoRun}
						/>
					</Box>
				</SplitPane>
			</Box>
		);
	}
	return (
		<Box sx={styles.container}>
			<Box sx={styles.sketchContainer}>
				<ReactP5Wrapper sketch={fetchSketchResult.data} />
			</Box>
		</Box>
	);
}
