import {
	Paper,
	Typography,
	Button,
	Box,
	CircularProgress,
	SxProps,
} from "@mui/material";
import { AnswerTypes, IQuestion } from "@eco8200/data-models";
import { questionnaireItemContainer } from "components/questionnaire/styles";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import QuestionLayoutFactory from "../questionLayoutFactory";
import * as styles from "../styles";
import { buttonTestSubmit } from "./strings";
import { buttonBack, buttonNext, questionText } from "../strings";
import { loadingSize } from "../consts";

export interface TestQuestionComponentProps {
	paperSx?: SxProps;
	question: IQuestion;
	questionNumber: number;
	isLast: boolean;
	isAnswerBeingSubmitted: boolean;
	onAnswerChange: (answer: AnswerTypes | undefined) => void;
	handleClick: VoidFunction;
	handleBack: VoidFunction;
}

export default function TestQuestionComponent({
	paperSx,
	question,
	questionNumber,
	isLast,
	isAnswerBeingSubmitted,
	onAnswerChange,
	handleClick,
	handleBack,
}: TestQuestionComponentProps): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<Paper
			sx={[
				questionnaireItemContainer,
				...(Array.isArray(paperSx) ? paperSx : [paperSx]),
			]}
		>
			<Box>
				<Typography sx={styles.questionNumber}>
					{`${translate(questionText)} ${questionNumber}`}
				</Typography>
				<Typography sx={styles.questionTitle}>{question.title}</Typography>
				<Typography sx={styles.questionDescription}>
					{question.description}
				</Typography>
				<QuestionLayoutFactory
					props={{
						question,
						onAnswerChange,
					}}
				/>
			</Box>
			<Box />
			<Box sx={styles.buttonLayer}>
				{isAnswerBeingSubmitted ? (
					<Button variant="contained" disabled>
						<CircularProgress color="inherit" size={loadingSize} />
					</Button>
				) : (
					<Button color="secondary" variant="contained" onClick={handleClick}>
						<Text textToTranslate={isLast ? buttonTestSubmit : buttonNext} />
					</Button>
				)}
				<Button color="secondary" variant="text" onClick={handleBack}>
					<Text textToTranslate={buttonBack} />
				</Button>
			</Box>
		</Paper>
	);
}
