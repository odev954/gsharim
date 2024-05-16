import { TrueFalseQuestionData } from "@eco8200/data-models";
import { useCallback } from "react";
import { useAnswerState } from "hooks/question";
import TrueFalseQuestionComponent from "./trueFalseQuestionComponent";
import { QuestionLayoutProps } from "../types";
import { isCheckStatusCorrect } from "../utils";

export default function TrueFalseQuestionContainer({
	question,
	onAnswerChange,
	checkResult,
}: QuestionLayoutProps<TrueFalseQuestionData>): JSX.Element {
	const [answer, setAnswer] = useAnswerState<TrueFalseQuestionData>(
		question,
		onAnswerChange
	);

	const answerTrue = useCallback(() => {
		setAnswer(true);
	}, [setAnswer]);

	const answerFalse = useCallback(() => {
		setAnswer(false);
	}, [setAnswer]);

	return (
		<TrueFalseQuestionComponent
			answerTrue={answerTrue}
			answerFalse={answerFalse}
			answer={answer}
			checkResult={checkResult}
			disabled={isCheckStatusCorrect(checkResult)}
		/>
	);
}
