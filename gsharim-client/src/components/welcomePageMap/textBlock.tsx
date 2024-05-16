import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Text from "components/text";
import * as styles from "./styles";

interface TextBlockProps {
	firstLine: string;
	secondLine: string;
}

export default function TextBlock({
	firstLine,
	secondLine,
}: TextBlockProps): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box>
			<Typography sx={isMobile ? styles.mobileFirstLine : styles.firstLine}>
				<Text textToTranslate={firstLine} />
			</Typography>
			<Typography sx={isMobile ? styles.mobileSecondLine : styles.secondLine}>
				<Text textToTranslate={secondLine} />
			</Typography>
		</Box>
	);
}
