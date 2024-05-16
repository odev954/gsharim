import { Box, Fade, Typography } from "@mui/material";
import Text from "components/text";
import * as styles from "./styles";
import { FadeDuration } from "./consts";
import { popupTitle } from "./strings";

type LabelChangePopupProps = {
	showPopup: boolean;
	text: string;
	textColor: string;
	backgroundColor: string;
};
export default function LabelChangePopup({
	showPopup,
	text,
	textColor,
	backgroundColor,
}: LabelChangePopupProps): JSX.Element {
	return (
		<Fade in={showPopup} timeout={FadeDuration}>
			<Box sx={styles.container}>
				<Box sx={[styles.message, { backgroundColor, color: textColor }]}>
					<Typography sx={styles.popupTitle}>
						<Text textToTranslate={popupTitle} />
					</Typography>
					<Typography sx={styles.text}>{text.toUpperCase()}</Typography>
				</Box>
			</Box>
		</Fade>
	);
}
