import { SingleChoiceQuestionData } from "@eco8200/data-models";
import { useAnswerState } from "hooks/question";
import { useCallback } from "react";
import { QuestionLayoutProps } from "../types";
import SingleChoiceQuestionComponent from "./singleChoiceQuestionComponent";
import { isCheckStatusCorrect } from "../utils";

export default function SingleChoiceQuestionContainer({
	question,
	onAnswerChange,
	checkResult,
}: QuestionLayoutProps<SingleChoiceQuestionData>): JSX.Element {
	const [answer, setAnswer] = useAnswerState<SingleChoiceQuestionData>(
		question,
		onAnswerChange
	);

	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, value: string) => {
			setAnswer(value);
		},
		[setAnswer]
	);

	return (
		<SingleChoiceQuestionComponent
			possibleAnswers={question.possibleAnswers}
			checkedAnswer={answer}
			checkResult={checkResult}
			onChange={onChange}
			disabled={isCheckStatusCorrect(checkResult)}
		/>
	);
}
