import { useCallback, useLayoutEffect, useState } from "react";
import { useQuestion, useTestQuestionSubmit } from "hooks/question";
import { AnswerTypes } from "@eco8200/data-models";
import Loader from "components/loading";
import { Paper, SxProps } from "@mui/material";
import TestQuestionComponent from "./testQuestionComponent";
import { ErrorComponent, ErrorPopup } from "../error";
import { isAnswerEmpty } from "../utils";
import { loaderContainer } from "../styles";

export interface TestQuestionContainerProps {
	paperSx?: SxProps;
	questionId: string;
	questionNumber: number;
	isLast: boolean;
	onBack: VoidFunction;
	openPopup: VoidFunction;
	onQuestionSubmitSuccess: (questionId: string, addToCount: boolean) => void;
}

export default function TestQuestionContainer({
	paperSx,
	questionId,
	questionNumber,
	isLast,
	onBack,
	openPopup,
	onQuestionSubmitSuccess,
}: TestQuestionContainerProps): JSX.Element {
	const {
		isLoading: isQuestionLoading,
		isError: isQuestionError,
		data: question,
		refetch,
	} = useQuestion(questionId);

	const {
		isSuccess: isQuestionSubmitSuccess,
		isLoading: isQuestionSubmitLoading,
		isError: isQuestionSubmitError,
		mutate,
		reset,
	} = useTestQuestionSubmit(questionId);

	const [answer, setAnswer] = useState<AnswerTypes>();

	const goToNextQuestion = useCallback(() => {
		onQuestionSubmitSuccess(questionId, isAnswerEmpty(answer));
		if (isLast) {
			openPopup();
		}
	}, [answer, isLast, onQuestionSubmitSuccess, openPopup, questionId]);

	const handleClick = useCallback(() => {
		if (answer !== undefined) {
			mutate(answer);
		} else {
			goToNextQuestion();
		}
	}, [answer, mutate, goToNextQuestion]);

	useLayoutEffect(() => {
		if (isQuestionSubmitSuccess) {
			goToNextQuestion();
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isQuestionSubmitSuccess]);

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
			<TestQuestionComponent
				paperSx={paperSx}
				question={question}
				questionNumber={questionNumber}
				isLast={isLast}
				isAnswerBeingSubmitted={isQuestionSubmitLoading}
				onAnswerChange={setAnswer}
				handleClick={handleClick}
				handleBack={onBack}
			/>
			<ErrorPopup open={isQuestionSubmitError} handleClose={reset} />
		</>
	);
}
