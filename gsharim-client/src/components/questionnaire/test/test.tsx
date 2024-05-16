import { useCallback, useEffect, useRef, useState } from "react";
import { TestQuestion } from "components/question";
import { useTestSubmit } from "hooks/questionnaire/useTestSubmit";
import { ErrorPopup } from "components/question/error";
import Loader from "components/loading";
import QuestionnaireStart from "../questionnaireStart";
import TestEndPopup from "./testEndPopup";
import TestAnalytics from "./testAnalytics";
import { startingIndex } from "../consts";

interface TestProps {
	testId: string;
	title: string;
	description: string;
	questionIds: string[];
	setTestDone: VoidFunction;
}

export default function Test({
	testId,
	title,
	description,
	questionIds,
	setTestDone,
}: TestProps): JSX.Element {
	const [currentQuestionIndex, setCurrentQuestionIndex] =
		useState(startingIndex);

	const AnsweredQuestionsCount = useRef(new Set<string>());

	const [submitionWarningPopupState, setSubmitionWarningPopupState] =
		useState(false);

	const beforeTest = currentQuestionIndex === startingIndex;

	const isDone = currentQuestionIndex >= questionIds.length;

	const isLast = currentQuestionIndex === questionIds.length - 1;

	const {
		isSuccess,
		isError,
		isLoading,
		data: testResult,
		mutate,
		reset,
	} = useTestSubmit(testId);

	const onNext = useCallback(() => {
		setCurrentQuestionIndex((current) => current + 1);
	}, []);

	const onBack = useCallback(() => {
		setCurrentQuestionIndex((current) => current - 1);
	}, []);

	const onTestSubmit = useCallback(() => {
		mutate();
	}, [mutate]);

	const openPopup = useCallback(() => {
		setSubmitionWarningPopupState(true);
	}, []);
	const closePopup = useCallback(() => {
		setSubmitionWarningPopupState(false);
	}, []);
	const submitTest = useCallback(() => {
		closePopup();
		onTestSubmit();
	}, [closePopup, onTestSubmit]);

	const onQuestionSubmitSuccess = useCallback(
		(questionId: string, isAnswerEmpty: boolean) => {
			if (!isLast) {
				onNext();
			}
			if (isAnswerEmpty) {
				AnsweredQuestionsCount.current.delete(questionId);
			} else {
				AnsweredQuestionsCount.current.add(questionId);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isLast]
	);

	useEffect(() => {
		if (isSuccess) {
			onNext();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	useEffect(() => {
		if (isDone) {
			setTestDone();
		}
	}, [setTestDone, isDone]);

	if (beforeTest) {
		return (
			<QuestionnaireStart
				titleText={title}
				description={description}
				examMode
				startQuestionnaire={onNext}
			/>
		);
	}

	if (isLoading) {
		return <Loader />;
	}

	if (isDone && isSuccess) {
		return (
			<TestAnalytics
				title={title}
				questionCount={currentQuestionIndex}
				pointsReceived={testResult.pointsRecived}
			/>
		);
	}

	return (
		<>
			{isLast && (
				<>
					<TestEndPopup
						popupState={submitionWarningPopupState}
						closePopup={closePopup}
						unAnsweredQuestions={
							questionIds.length - AnsweredQuestionsCount.current.size
						}
						submitTest={submitTest}
					/>
					<ErrorPopup open={isError} handleClose={reset} />
				</>
			)}
			<TestQuestion
				questionId={questionIds[currentQuestionIndex]}
				questionNumber={currentQuestionIndex + 1}
				isLast={isLast}
				onBack={onBack}
				openPopup={openPopup}
				onQuestionSubmitSuccess={onQuestionSubmitSuccess}
			/>
		</>
	);
}
