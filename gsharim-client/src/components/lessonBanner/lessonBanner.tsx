import { Box } from "@mui/material";
import * as styles from "./styles";

export interface LessonBannerProps {
	displayNumber?: number;
}

function LessonBanner({ displayNumber }: LessonBannerProps): JSX.Element {
	return (
		<Box sx={styles.container}>
			<Box sx={styles.bannerContainer}>
				<Box sx={styles.bannerBlock}>{displayNumber}</Box>
				<Box sx={styles.bannerLine} />
				<Box sx={styles.bannerBase} />
			</Box>
		</Box>
	);
}

export default LessonBanner;
