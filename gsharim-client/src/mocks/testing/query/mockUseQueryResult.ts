import { FetchStatus, UseQueryResult } from "@tanstack/react-query";
import { vi } from "vitest";

export function mockUseQueryResult<T = unknown>(useQueryResultParams: {
	data?: T;
	isLoading?: boolean;
}): UseQueryResult<T, Error | null> {
	const { data, isLoading } = useQueryResultParams;
	const fixedQueryValues = {
		dataUpdatedAt: 0,
		errorUpdatedAt: 0,
		failureCount: 0,
		failureReason: null,
		isFetched: false,
		isFetchedAfterMount: false,
		isFetching: false,
		isPaused: false,
		isPlaceholderData: false,
		isPreviousData: false,
		isRefetching: false,
		isInitialLoading: false,
		isStale: false,
		refetch: vi.fn(),
		remove: vi.fn(),
		fetchStatus: "idle" as FetchStatus,
		errorUpdateCount: 0,
	};

	if (data !== undefined) {
		return {
			data,
			error: null,
			isError: false,
			isLoading: false,
			isLoadingError: false,
			isSuccess: true,
			status: "success",
			isRefetchError: false,
			...fixedQueryValues,
		};
	}
	if (isLoading) {
		return {
			data: undefined,
			error: null,
			isError: false,
			isLoading,
			isLoadingError: false,
			isSuccess: false,
			status: "loading",
			isRefetchError: false,
			...fixedQueryValues,
		};
	}
	return {
		data: undefined,
		error: new Error(),
		isError: true,
		isLoading: false,
		isLoadingError: true,
		isSuccess: false,
		status: "error",
		isRefetchError: false,
		...fixedQueryValues,
	};
}
