import { SxProps, Theme } from "@mui/material";
import * as styles from "./styles";

export const generateLineStyles = (
	isTextBeforeImage: boolean,
	isMobile: boolean
): SxProps<Theme> => {
	if (isMobile) {
		return styles.mobileLine;
	}
	if (isTextBeforeImage) {
		return styles.reversedLine;
	}
	return styles.line;
};
