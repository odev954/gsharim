import {
	AnswerCheckStatus,
	AnswerTypes,
	CheckedQuestionSubmitResult,
	QuestionType,
} from "@eco8200/data-models";
import { xor } from "lodash-es";
import { questionMocks, questionAnswers } from "./questionMocks";

export function questionCheckMock(
	questionId: string,
	submittedAnswer: AnswerTypes | undefined
): CheckedQuestionSubmitResult {
	const question = questionMocks[questionId];
	const answer = questionAnswers[questionId];
	let status: boolean;

	// Setting the users submitted answer to submittedAnswer at questionMocks file
	question.submittedAnswer = submittedAnswer;

	if (question.variant === QuestionType.MultiChoice) {
		status = xor(submittedAnswer as string[], answer as string[]).length === 0;
	} else {
		status = submittedAnswer === answer;
	}

	return {
		questionId,
		isChecked: true,
		checkStatus: status ? AnswerCheckStatus.Correct : AnswerCheckStatus.Wrong,
		explanation: "טקסט",
	};
}
