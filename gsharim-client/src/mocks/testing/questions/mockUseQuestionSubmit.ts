import { AnswerTypes, CheckedQuestionSubmitResult } from "@eco8200/data-models";
import { UseMutationResult } from "@tanstack/react-query";
import { mockUseMutationResult } from "../query/mockUseMutationResult";
import { questionCheckMock } from "./questionCheckMock";

export function mockUseQuestionSubmit(useQuestionSubmitParams: {
	data?: {
		questionId: string;
		answer: AnswerTypes;
	};
	isLoading?: boolean;
	isError?: boolean;
}): UseMutationResult<CheckedQuestionSubmitResult, Error | null, void, void> {
	const { data, isLoading, isError } = useQuestionSubmitParams;
	return mockUseMutationResult({
		data: data && questionCheckMock(data.questionId, data.answer),
		isLoading,
		isError,
	});
}
