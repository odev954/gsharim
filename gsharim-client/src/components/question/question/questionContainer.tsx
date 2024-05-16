import { useCallback, useEffect, useState } from "react";
import { useQuestion, useQuestionSubmit } from "hooks/question";
import { AnswerCheckStatus, AnswerTypes } from "@eco8200/data-models";
import Loader from "components/loading";
import { Paper, SxProps } from "@mui/material";
import QuestionComponent from "./questionComponent";
import { ErrorComponent, ErrorPopup } from "../error";
import { isAnswerEmpty } from "../utils";
import { ButtonTextOptions } from ".";
import { loaderContainer } from "../styles";

export interface QuestionContainerProps {
	paperSx?: SxProps;
	questionId: string;
	questionNumber?: number;
	options?: ButtonTextOptions;
	disabled?: boolean;
	onNext: VoidFunction;
	onBack?: VoidFunction;
}

export default function QuestionContainer({
	paperSx,
	questionId,
	questionNumber,
	options,
	onNext,
	onBack,
	disabled = false,
}: QuestionContainerProps): JSX.Element {
	const {
		isLoading: isQuestionLoading,
		isError: isQuestionError,
		data: question,
		refetch,
	} = useQuestion(questionId);

	const {
		isLoading: isQuestionSubmitLoading,
		isError: isQuestionSubmitError,
		data: checkResult,
		mutate,
		reset,
	} = useQuestionSubmit(questionId);

	const [answer, setAnswer] = useState<AnswerTypes>();

	const [isExplanationOpen, setIsExplanationOpen] = useState(false);

	const handleClick = useCallback(() => {
		if (checkResult?.checkStatus === AnswerCheckStatus.Correct) {
			onNext();
		} else if (answer !== undefined) {
			mutate(answer);
		} else {
			throw new Error("answer is undefined");
		}
	}, [checkResult, mutate, answer, onNext]);

	const closeExplanation = useCallback(() => {
		setIsExplanationOpen(false);
	}, []);

	useEffect(() => {
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionId]);

	useEffect(() => {
		if (checkResult?.checkStatus === AnswerCheckStatus.Wrong) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answer]);

	useEffect(() => {
		if (checkResult?.checkStatus === AnswerCheckStatus.Wrong) {
			setIsExplanationOpen(true);
		}
	}, [checkResult]);

	if (isQuestionError) {
		return <ErrorComponent paperSx={paperSx} retry={refetch} />;
	}

	if (isQuestionLoading) {
		return (
			<Paper
				sx={[
					...loaderContainer,
					...(Array.isArray(paperSx) ? paperSx : [paperSx]),
				]}
			>
				<Loader />
			</Paper>
		);
	}

	return (
		<>
			<QuestionComponent
				paperSx={paperSx}
				question={question}
				questionNumber={questionNumber}
				options={options}
				isAnswerBeingSubmitted={isQuestionSubmitLoading}
				isExplanationOpen={isExplanationOpen}
				closeExplanation={closeExplanation}
				onAnswerChange={setAnswer}
				checkResult={checkResult}
				handleClick={handleClick}
				handleBack={onBack}
				disabled={isAnswerEmpty(answer) || disabled}
			/>
			<ErrorPopup open={isQuestionSubmitError} handleClose={reset} />
		</>
	);
}
