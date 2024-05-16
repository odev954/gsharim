import {
	useQuery,
	useQueryClient,
	useMutation,
	UseQueryOptions,
	QueryKey,
} from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { UpdateAction, UseServerDataResult } from "types/server/useServerData";
import { cloneDeep, isEqual } from "lodash-es";
import { useDeepMemo } from "hooks/common";
import { retryCount } from "./consts";
import { createFetchPromise, removeObjectKeys } from "./utils";

function isUpdateActionCallable<T>(
	action: UpdateAction<T>
): action is (oldData: T) => T {
	return typeof action === "function";
}

type useServerDataProps<TData, TError> = {
	/** the query key for useQuery */
	queryKey: QueryKey;
	/** the query function for useQuery */
	queryFn: () => Promise<TData>;
	/** when updating the data, what is the side effects that need to happen */
	onUpdate?: (oldData: TData, newData: TData) => void;
	/** when updating the data, what keys are allowed to update.
	 * if empty, then all the keys are allowed.
	 * the syntax should be a path to an attribute, kes should be separated with "."
	 * if there is a list of objects, to apply to all the items in the list, use "*"
	 * for example, the object {a: [{b: 1}, {b:2}]}
	 * to update the b values, use the key a.*.b
	 */
	allowedUpdateKeyPaths?: string[];
} & UseQueryOptions<TData, TError>;

type TValues<T> = {
	oldValue: T;
	newValue: T;
};

/**
 * wraps useQuery with useMutation.
 * This hook fetches the data once, and then when setting the data, the data changes and
 * onUpdate is called.
 */
export default function useServerData<TData>({
	queryKey,
	queryFn,
	onUpdate,
	allowedUpdateKeyPaths = [],
	...options
}: useServerDataProps<TData, Error>): UseServerDataResult<TData, Error> {
	const effectiveQueryKey = useDeepMemo(() => queryKey, [queryKey]);
	const resolvePromiseRef = useRef<VoidFunction>();
	const rejectPromiseRef = useRef<VoidFunction>();
	// here assuming that the query client stale time is infinity, and so there will never be a refetch after the first one
	const isFetchedPromise = useMemo(
		() => createFetchPromise(resolvePromiseRef, rejectPromiseRef),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[queryKey, queryFn] // if the query key or query function updates, there will be a new fetch, so create a new promise
	);
	const firstFetchedDataRef = useRef<TData | undefined>();

	const queryClient = useQueryClient();
	const useQueryResult = useQuery({
		queryKey: effectiveQueryKey,
		queryFn,
		...options,
	});
	useEffect(() => {
		if (useQueryResult.isError) {
			rejectPromiseRef.current?.();
		} else if (useQueryResult.data) {
			firstFetchedDataRef.current = useQueryResult.data;
			resolvePromiseRef.current?.();
		}
	}, [useQueryResult.data, useQueryResult.isError]);

	// this function tries to call onUpdate, if it succeeds, it returns the new value, otherwise it returns the previous
	const mutationFunction = useCallback(
		async (values: TValues<TData>) => {
			if (onUpdate && values.oldValue !== undefined) {
				await onUpdate(values.oldValue, values.newValue);
				return values.newValue;
			}
			if (values.oldValue !== undefined) return values.newValue;
			return undefined;
		},
		[onUpdate]
	);
	const {
		mutate,
		data: lastSuccessfullySetData,
		isError: isOnUpdateError,
	} = useMutation({
		mutationFn: mutationFunction,
		retry: retryCount,
	});
	useEffect(() => {
		if (isOnUpdateError) {
			queryClient.setQueryData(
				effectiveQueryKey,
				lastSuccessfullySetData || useQueryResult.data
			);
		}
	}, [
		isOnUpdateError,
		lastSuccessfullySetData,
		queryClient,
		effectiveQueryKey,
		useQueryResult.data,
	]);
	const setData = useCallback(
		async (action: UpdateAction<TData>) => {
			// if trying to set the data before the data has arrived, wait for the data to arrive and then set it.
			if (useQueryResult.data === undefined) {
				await isFetchedPromise;
			}
			// in the case that useQueryResult.data was undefined, after awaiting the promise, the state of useQueryResult.data did not update, but the reference did
			const currentData = useQueryResult.data || firstFetchedDataRef.current;
			// if currentData is undefined, this means that the fetch failed, which is fine, but it trying to set data of a failed fetch, throw error
			if (currentData === undefined) {
				throw new Error("trying to set data after fetching data failed");
			}

			let newValue: TData;
			if (isUpdateActionCallable(action)) {
				const oldValueClone = cloneDeep(currentData);
				newValue = action(oldValueClone);
			} else {
				newValue = action;
			}
			const oldValue = cloneDeep(currentData);
			if (!isEqual(oldValue, newValue)) {
				if (
					typeof newValue === "object" &&
					allowedUpdateKeyPaths &&
					allowedUpdateKeyPaths.length > 0 &&
					!isEqual(
						removeObjectKeys(oldValue, allowedUpdateKeyPaths),
						removeObjectKeys(newValue, allowedUpdateKeyPaths)
					)
				) {
					throw new Error(
						`trying to change keys that are not in ${allowedUpdateKeyPaths}`
					);
				}
				mutate({ oldValue, newValue });
				queryClient.setQueryData(effectiveQueryKey, newValue);
			}
		},
		[
			useQueryResult.data,
			isFetchedPromise,
			allowedUpdateKeyPaths,
			mutate,
			queryClient,
			effectiveQueryKey,
		]
	);

	const useServerDataResult = useMemo(
		() => ({ ...useQueryResult, setData }),
		[setData, useQueryResult]
	);

	return useServerDataResult;
}
