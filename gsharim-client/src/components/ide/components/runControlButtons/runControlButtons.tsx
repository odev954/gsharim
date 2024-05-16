import { useCallback, useMemo } from "react";
import { Box, Button, Fade } from "@mui/material";
import { useLogger } from "hooks/logger";
import { useTranslation } from "react-i18next";
import Text from "components/text";
import * as styles from "./styles";
import { loadingText, runningText, readyText } from "./strings";
import { FadeInTime } from "./cosnts";

type RunControlButtonsProps = {
	onRun: () => void;
	onStop: () => void;
	isRunning: boolean;
	isReady: boolean;
};

export default function RunControlButtons({
	onRun,
	onStop,
	isRunning,
	isReady,
}: RunControlButtonsProps): JSX.Element {
	const logger = useLogger();
	const { t: translate } = useTranslation();

	const text = useMemo(() => {
		if (!isReady) {
			return loadingText;
		}
		if (isRunning) {
			return runningText;
		}
		return readyText;
	}, [isRunning, isReady]);
	const onClick = useCallback(() => {
		logger.info("ide-button-clicked", `ide button ${text} was clicked`, {
			buttonName: translate(text),
			isRunning,
			isReady,
		});
		if (isReady) {
			if (isRunning) {
				onStop();
			} else {
				onRun();
			}
		}
	}, [onRun, onStop, isRunning, isReady, logger, text, translate]);

	const buttonSx = useMemo(() => {
		if (!isReady) {
			return styles.loadingRunButton;
		}
		if (isRunning) {
			return styles.stopButton;
		}
		return styles.runButton;
	}, [isRunning, isReady]);
	return (
		<Fade in timeout={FadeInTime}>
			<Box sx={styles.container}>
				<Button sx={buttonSx} onClick={onClick}>
					<Text textToTranslate={text} />
				</Button>
			</Box>
		</Fade>
	);
}
