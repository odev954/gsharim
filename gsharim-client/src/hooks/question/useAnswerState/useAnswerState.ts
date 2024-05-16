import { IAnswerSubmit, IQuestion } from "@eco8200/data-models";
import { useState, useEffect } from "react";

type Answer<T extends IAnswerSubmit> = T["submittedAnswer"];

export function useAnswerState<T extends IQuestion>(
	question: T,
	onAnswerChange: (answer: T["submittedAnswer"] | undefined) => void,
	defaultAnswer?: Answer<T>
): [
	Answer<T> | undefined,
	React.Dispatch<React.SetStateAction<Answer<T> | undefined>>
] {
	const [answer, setAnswer] = useState(defaultAnswer);

	useEffect(() => {
		onAnswerChange(answer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answer]);

	useEffect(() => {
		setAnswer(question.submittedAnswer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [question.id]);

	return [answer, setAnswer];
}
