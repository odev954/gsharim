import { MultiChoiceQuestionData } from "@eco8200/data-models";
import { useAnswerState } from "hooks/question";
import { useCallback } from "react";
import { QuestionLayoutProps } from "../types";
import { emptyAnswer } from "./consts";
import MultiChoiceQuestionComponent from "./multiChoiceQuestionComponent";
import { addId, removeId } from "./utils";
import { isCheckStatusCorrect } from "../utils";

export default function MultiChoiceQuestionContainer({
	question,
	onAnswerChange,
	checkResult,
}: QuestionLayoutProps<MultiChoiceQuestionData>): JSX.Element {
	const [answer, setAnswer] = useAnswerState<MultiChoiceQuestionData>(
		question,
		onAnswerChange,
		emptyAnswer
	);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
			const manipulate = checked ? addId : removeId;
			const questionId = event.target.value;
			setAnswer((currentAnswer) =>
				manipulate(currentAnswer || emptyAnswer, questionId)
			);
		},
		[setAnswer]
	);

	return (
		<MultiChoiceQuestionComponent
			possibleAnswers={question.possibleAnswers}
			answer={answer || emptyAnswer}
			checkResult={checkResult}
			handleChange={handleChange}
			disabled={isCheckStatusCorrect(checkResult)}
		/>
	);
}
