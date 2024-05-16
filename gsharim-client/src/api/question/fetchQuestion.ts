import { IQuestion, IQuestionSchema } from "@eco8200/data-models";
import { questionSelectionMock } from "mocks/demo/questions";

export async function fetchQuestion(questionId: string): Promise<IQuestion> {
	const question = questionSelectionMock(questionId);
	IQuestionSchema.passthrough().parse(question);
	return question;
}
