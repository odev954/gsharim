import {
	SubmitQuestion,
	UncheckedQuestionSubmitResult,
	UncheckedQuestionSubmitResultSchema,
} from "@eco8200/data-models";
import { testQuestionSubmitMock } from "mocks/demo/questions";

export async function submitTestQuestionAnswer(
	data: SubmitQuestion
): Promise<UncheckedQuestionSubmitResult> {
	const answerSubmitionConfirmation = testQuestionSubmitMock(
		data.questionId,
		data.submition
	);
	return UncheckedQuestionSubmitResultSchema.parse(answerSubmitionConfirmation);
}
