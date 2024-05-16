import { Box, CircularProgress } from "@mui/material";
import * as styles from "./styles";
import { defaultSize } from "./consts";

interface CircularProgressWithLabelProps {
	value: number | undefined;
	size?: number;
	thickness?: number;
	children?: JSX.Element;
}
export default function CircularProgressWithLabel({
	value,
	thickness,
	size = defaultSize,
	children,
}: CircularProgressWithLabelProps): JSX.Element {
	return (
		<Box sx={styles.progressContainer}>
			<CircularProgress
				variant="determinate"
				value={value}
				size={size}
				thickness={thickness}
				sx={styles.progress}
			/>
			<Box sx={styles.childrenContainer}>{children}</Box>
		</Box>
	);
}
