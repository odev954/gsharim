import {
	AnswerTypes,
	UncheckedQuestionSubmitResult,
} from "@eco8200/data-models";
import { questionMocks } from "./questionMocks";

export function testQuestionSubmitMock(
	questionId: string,
	submittedAnswer: AnswerTypes
): UncheckedQuestionSubmitResult {
	const question = questionMocks[questionId];

	// Setting the users submitted answer to submittedAnswer at questionMocks file
	question.submittedAnswer = submittedAnswer;

	return {
		questionId,
		isChecked: false,
	};
}
