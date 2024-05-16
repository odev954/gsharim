import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { submitTestQuestionAnswer } from "api/question";
import {
	AnswerTypes,
	UncheckedQuestionSubmitResult,
} from "@eco8200/data-models";
import { idIdentifier } from "./consts";

export function useTestQuestionSubmit(
	questionId: string
): UseMutationResult<
	UncheckedQuestionSubmitResult,
	Error | null,
	AnswerTypes,
	void
> {
	return useMutation({
		mutationKey: [idIdentifier, questionId],
		mutationFn: (submition: AnswerTypes) =>
			submitTestQuestionAnswer({
				submition,
				questionId,
			}),
	});
}
