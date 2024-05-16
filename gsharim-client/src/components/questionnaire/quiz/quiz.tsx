import { useCallback, useEffect, useState } from "react";
import { Question } from "components/question";
import QuizEnd from "./quizEnd";
import { startingIndex } from "../consts";
import QuestionnaireStart from "../questionnaireStart";

interface QuizProps {
	title: string;
	description: string;
	questionIds: string[];
	onQuizDone: VoidFunction;
}

export default function Quiz({
	title,
	description,
	questionIds,
	onQuizDone,
}: QuizProps): JSX.Element {
	const [currentQuestionIndex, setCurrentQuestionIndex] =
		useState(startingIndex);

	const onNext = useCallback(() => {
		setCurrentQuestionIndex((current) => current + 1);
	}, []);

	const onBack = useCallback(() => {
		setCurrentQuestionIndex((current) => current - 1);
	}, []);

	const beforeQuiz = currentQuestionIndex === startingIndex;

	const isDone = currentQuestionIndex >= questionIds.length;

	useEffect(() => {
		if (isDone) {
			onQuizDone();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDone]);

	if (beforeQuiz) {
		return (
			<QuestionnaireStart
				titleText={title}
				description={description}
				examMode={false}
				startQuestionnaire={onNext}
			/>
		);
	}

	if (isDone) {
		return <QuizEnd onBack={onBack} />;
	}

	return (
		<Question
			questionId={questionIds[currentQuestionIndex]}
			questionNumber={currentQuestionIndex + 1}
			onNext={onNext}
			onBack={onBack}
		/>
	);
}
