import { useRef } from "react";
import {
	Paper,
	Typography,
	Button,
	Box,
	CircularProgress,
	SxProps,
} from "@mui/material";
import {
	AnswerTypes,
	CheckedQuestionSubmitResult,
	IQuestion,
} from "@eco8200/data-models";
import { questionnaireItemContainer } from "components/questionnaire/styles";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import QuestionLayoutFactory from "../questionLayoutFactory";
import Explanation from "./explanation";
import { buttonText } from "./utils";
import * as styles from "../styles";
import { buttonBack, questionText, buttonNext } from "../strings";
import { ButtonTextOptions } from ".";
import { loadingSize } from "../consts";
import { buttonSubmit } from "./strings";

export interface QuestionComponentProps {
	paperSx?: SxProps;
	question: IQuestion;
	questionNumber?: number;
	options?: ButtonTextOptions;
	isAnswerBeingSubmitted: boolean;
	isExplanationOpen: boolean;
	closeExplanation: VoidFunction;
	onAnswerChange: (answer: AnswerTypes | undefined) => void;
	checkResult?: CheckedQuestionSubmitResult;
	handleClick: VoidFunction;
	handleBack?: VoidFunction;
	disabled: boolean;
}

export default function QuestionComponent({
	paperSx,
	question,
	questionNumber,
	options,
	isAnswerBeingSubmitted,
	isExplanationOpen,
	closeExplanation,
	onAnswerChange,
	checkResult,
	handleClick,
	handleBack,
	disabled,
}: QuestionComponentProps): JSX.Element {
	const submitButton = useRef<HTMLButtonElement>(null);
	const { t: translate } = useTranslation();

	return (
		<Paper
			sx={[
				questionnaireItemContainer,
				...(Array.isArray(paperSx) ? paperSx : [paperSx]),
			]}
		>
			<Box>
				{questionNumber && (
					<Typography sx={styles.questionNumber}>
						{`${translate(questionText)} ${questionNumber}`}
					</Typography>
				)}
				<Typography sx={styles.questionTitle}>{question.title}</Typography>
				<Typography sx={styles.questionDescription}>
					{question.description}
				</Typography>
			</Box>
			<QuestionLayoutFactory
				props={{
					question,
					onAnswerChange,
					checkResult,
				}}
			/>
			<Explanation
				open={isExplanationOpen}
				baseButton={submitButton}
				closePopup={closeExplanation}
				explanation={checkResult?.explanation}
			/>
			<Box />
			<Box sx={styles.buttonLayer}>
				{isAnswerBeingSubmitted ? (
					<Button variant="contained" disabled>
						<CircularProgress color="inherit" size={loadingSize} />
					</Button>
				) : (
					<Button
						variant="contained"
						color="secondary"
						ref={submitButton}
						onClick={handleClick}
						disabled={disabled}
					>
						{buttonText(
							translate(buttonNext),
							translate(buttonSubmit),
							checkResult,
							options
						)}
					</Button>
				)}
				{handleBack && (
					<Button color="secondary" variant="text" onClick={handleBack}>
						<Text textToTranslate={buttonBack} />
					</Button>
				)}
			</Box>
		</Paper>
	);
}
