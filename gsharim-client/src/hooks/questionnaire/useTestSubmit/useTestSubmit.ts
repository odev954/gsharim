import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { submitTest } from "api/questionnaire";
import { TestSubmitResult } from "@eco8200/data-models";
import { idIdentifier } from "./consts";

export function useTestSubmit(
	quizId: string
): UseMutationResult<TestSubmitResult, Error | null, void, void> {
	return useMutation({
		mutationKey: [idIdentifier, quizId],
		mutationFn: () => submitTest({ quizId }),
	});
}
