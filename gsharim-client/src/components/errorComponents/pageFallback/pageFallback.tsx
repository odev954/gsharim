import { Box } from "@mui/material";
import Lottie from "lottie-react";
import pageNotFound from "assets/lottie/pageNotFound.json";
import { FallbackComponentProps } from "components/errorBoundary/types";
import * as styles from "./styles";

function PageFallback({
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
}: FallbackComponentProps): JSX.Element {
	return (
		<Box sx={styles.fallbackContainer}>
			<Lottie
				id="lottie-page-loader"
				animationData={pageNotFound}
				loop
				style={styles.lottie}
			/>
			<Box>{errorTextTitle}</Box>
			<Box>{errorText}</Box>
		</Box>
	);
}

export default PageFallback;
