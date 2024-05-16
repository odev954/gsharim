import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import * as styles from "components/question/styles";
import Text from "components/text";
import { bold, modal, popupContainer } from "./styles";
import * as strings from "./strings";
import { questionsLeft } from "./utils";

interface TestEndPopupProps {
	popupState: boolean;
	closePopup: VoidFunction;
	unAnsweredQuestions: number;
	submitTest: VoidFunction;
}

export default function TestEndPopup({
	popupState,
	closePopup,
	unAnsweredQuestions,
	submitTest,
}: TestEndPopupProps): JSX.Element {
	const showWarning = unAnsweredQuestions > 0;

	return (
		<Modal sx={modal} open={popupState} onClose={closePopup}>
			<Paper sx={popupContainer}>
				<Box>
					<Typography sx={styles.questionTitle}>
						<Text textToTranslate={strings.title} />
					</Typography>
					<Typography sx={styles.questionDescription}>
						<Text textToTranslate={strings.submitWarning} />
					</Typography>
					{showWarning && (
						<Typography sx={[styles.questionDescription, bold]}>
							{questionsLeft(unAnsweredQuestions)}
						</Typography>
					)}
					<Typography sx={styles.questionDescription}>
						<Text textToTranslate={strings.submitAssuranceQuestion} />
					</Typography>
				</Box>
				<Box sx={styles.buttonLayer}>
					<Button color="secondary" variant="contained" onClick={submitTest}>
						<Text textToTranslate={strings.submitTest} />
					</Button>
					<Button color="secondary" variant="outlined" onClick={closePopup}>
						<Text textToTranslate={strings.buttonBack} />
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
