import { UseMutationResult } from "@tanstack/react-query";
import { vi } from "vitest";

export function mockUseMutationResult<T = unknown>(useMutationResultParams: {
	data?: T;
	isLoading?: boolean;
	isError?: boolean;
}): UseMutationResult<T, Error | null, void, void> {
	const { data, isLoading, isError } = useMutationResultParams;
	const fixedMutationValues = {
		isPaused: false,
		failureCount: 0,
		failureReason: null,
		mutate: vi.fn(),
		mutateAsync: vi.fn(),
		reset: vi.fn(),
		context: undefined,
		variables: undefined,
	};

	if (data !== undefined) {
		return {
			data,
			error: null,
			isError: false,
			isIdle: false,
			isLoading: false,
			isSuccess: true,
			status: "success",
			...fixedMutationValues,
		};
	}
	if (isLoading) {
		return {
			data: undefined,
			error: null,
			isError: false,
			isIdle: false,
			isLoading,
			isSuccess: false,
			status: "loading",
			...fixedMutationValues,
		};
	}
	if (isError)
		return {
			data: undefined,
			error: new Error(),
			isError,
			isIdle: false,
			isLoading: false,
			isSuccess: false,
			status: "error",
			...fixedMutationValues,
		};

	return {
		data: undefined,
		error: null,
		isError: false,
		isIdle: true,
		isLoading: false,
		isSuccess: false,
		status: "idle",
		...fixedMutationValues,
	};
}
