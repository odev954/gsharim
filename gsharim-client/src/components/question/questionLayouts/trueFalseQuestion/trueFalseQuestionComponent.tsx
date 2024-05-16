import { Box, Button } from "@mui/material";
import { QuestionSubmitResult } from "@eco8200/data-models";
import Text from "components/text";
import { correctAnswer, incorrectAnswer } from "./strings";
import * as styles from "./styles";
import { outline } from "./utils";

interface TrueFalseQuestionProps {
	answerTrue: VoidFunction;
	answerFalse: VoidFunction;
	answer: boolean | undefined;
	checkResult?: QuestionSubmitResult;
	disabled: boolean;
}

export default function TrueFalseQuestionComponent({
	answerTrue,
	answerFalse,
	answer,
	checkResult,
	disabled,
}: TrueFalseQuestionProps): JSX.Element {
	return (
		<Box sx={styles.answerArea}>
			<Button
				sx={[answer === true && outline(checkResult)]}
				variant="largeOutlined"
				onClick={answerTrue}
				disabled={disabled}
			>
				<Text textToTranslate={correctAnswer} />
			</Button>
			<Button
				sx={[answer === false && outline(checkResult)]}
				variant="largeOutlined"
				onClick={answerFalse}
				disabled={disabled}
			>
				<Text textToTranslate={incorrectAnswer} />
			</Button>
		</Box>
	);
}
