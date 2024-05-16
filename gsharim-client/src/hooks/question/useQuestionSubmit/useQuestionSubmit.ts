import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { submitQuestionAnswer } from "api/question";
import { CheckedQuestionSubmitResult, AnswerTypes } from "@eco8200/data-models";
import { idIdentifier } from "./consts";

export function useQuestionSubmit(
	questionId: string
): UseMutationResult<
	CheckedQuestionSubmitResult,
	Error | null,
	AnswerTypes,
	void
> {
	return useMutation({
		mutationKey: [idIdentifier, questionId],
		mutationFn: (submition: AnswerTypes) =>
			submitQuestionAnswer({
				submition,
				questionId,
			}),
	});
}
