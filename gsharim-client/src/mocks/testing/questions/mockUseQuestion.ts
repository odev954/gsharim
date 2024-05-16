import { UseQueryResult } from "@tanstack/react-query";
import { IQuestion } from "@eco8200/data-models";
import { mockUseQueryResult } from "../query/mockUseQueryResult";
import { questionSelectionMock } from "./questionSelectionMock";

export function mockUseQuestion(useQuestionParams: {
	questionId?: string;
	isLoading?: boolean;
}): UseQueryResult<IQuestion> {
	const { questionId, isLoading } = useQuestionParams;
	return mockUseQueryResult({
		data: questionId ? questionSelectionMock(questionId) : undefined,
		isLoading,
	});
}
