import { Box } from "@mui/material";

import { useProgressBarCalculatedStyles } from "./hooks";
import * as styles from "./styles";

type ProgressBarProps = {
	percentage: number;
};

export default function ProgressBar({
	percentage,
}: ProgressBarProps): JSX.Element {
	const progressBarCalculatedStyles =
		useProgressBarCalculatedStyles(percentage);
	return (
		<Box sx={styles.progressContainer}>
			<Box sx={styles.progressInfo}>{percentage}%</Box>
			<Box sx={styles.progress}>
				<Box
					sx={{
						...styles.progressBar,
						...progressBarCalculatedStyles,
					}}
				/>
			</Box>
		</Box>
	);
}
