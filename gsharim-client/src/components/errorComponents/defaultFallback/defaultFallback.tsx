import { Box } from "@mui/material";
import Lottie from "lottie-react";
import keyboardCrash from "assets/lottie/keyboardCrash.json";
import { FallbackComponentProps } from "components/errorBoundary/types";
import * as styles from "./styles";

function DefaultComponentFallback({
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
}: FallbackComponentProps): JSX.Element {
	return (
		<Box sx={styles.fallbackContainer}>
			<Lottie
				id="lottie-page-loader"
				animationData={keyboardCrash}
				loop
				style={styles.lottie}
			/>
			<Box>{errorTextTitle}</Box>
			<Box>{errorText}</Box>
		</Box>
	);
}

export default DefaultComponentFallback;
