import {
	CheckedQuestionSubmitResult,
	CheckedQuestionSubmitResultSchema,
	SubmitQuestion,
} from "@eco8200/data-models";
import { questionCheckMock } from "mocks/demo/questions";

export async function submitQuestionAnswer(
	data: SubmitQuestion
): Promise<CheckedQuestionSubmitResult> {
	const questionCheckResult = questionCheckMock(
		data.questionId,
		data.submition
	);
	return CheckedQuestionSubmitResultSchema.parse(questionCheckResult);
}
