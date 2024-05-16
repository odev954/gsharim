import {
	AnswerTypes,
	UncheckedQuestionSubmitResult,
} from "@eco8200/data-models";
import { UseMutationResult } from "@tanstack/react-query";
import { mockUseMutationResult } from "../query/mockUseMutationResult";
import { testQuestionSubmitMock } from "./testQuestionSubmitMock";

export function mockUseTestQuestionSubmit(useQuestionSubmitParams: {
	data?: {
		questionId: string;
		answer: AnswerTypes;
	};
	isLoading?: boolean;
	isError?: boolean;
}): UseMutationResult<UncheckedQuestionSubmitResult, Error | null, void, void> {
	const { data, isLoading, isError } = useQuestionSubmitParams;
	return mockUseMutationResult({
		data: data && testQuestionSubmitMock(data.questionId, data.answer),
		isLoading,
		isError,
	});
}
