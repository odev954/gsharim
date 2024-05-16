import { RefObject } from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import xIcon from "assets/modal/XIcon.svg";
import Text from "components/text";
import { title as titleStyle } from "./styles";
import { answerText } from "./strings";
import * as styles from "./styles";
import { anchorOrigin, transformOrigin } from "./consts";

interface ExplanationProps {
	open: boolean;
	baseButton: RefObject<Element>;
	closePopup: VoidFunction;
	explanation: string | undefined;
}

export default function Explanation({
	open,
	baseButton,
	closePopup,
	explanation,
}: ExplanationProps): JSX.Element {
	return (
		<Popover
			open={open}
			anchorEl={baseButton.current}
			anchorOrigin={anchorOrigin}
			transformOrigin={transformOrigin}
			onClose={closePopup}
			PaperProps={{ sx: styles.popupContainer }}
		>
			<Box sx={styles.topLayerContainer}>
				<Button
					sx={styles.closeButton}
					variant="text"
					color="secondary"
					onClick={closePopup}
				>
					<Box component="img" src={xIcon} />
				</Button>
				<Typography sx={titleStyle}>
					<Text textToTranslate={answerText} />
				</Typography>
			</Box>
			<Typography sx={styles.explanationText}>{explanation}</Typography>
		</Popover>
	);
}
