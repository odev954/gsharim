import { TestSubmitResult } from "@eco8200/data-models";
import { UseMutationResult } from "@tanstack/react-query";
import { mockUseMutationResult } from "../query/mockUseMutationResult";
import { testAnswerMock } from "./testAnswerMock";

export function mockUseTestSubmit(
	useTestSubmitParams: {
		isSuccess?: boolean;
		isLoading?: boolean;
		isError?: boolean;
	} = {}
): UseMutationResult<TestSubmitResult, Error | null, void, void> {
	const { isSuccess, isLoading, isError } = useTestSubmitParams;
	return mockUseMutationResult({
		data: isSuccess ? testAnswerMock() : undefined,
		isLoading,
		isError,
	});
}
