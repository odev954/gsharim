import { UseQueryResult } from "@tanstack/react-query";

export type UpdateAction<T> = ((oldData: T) => T) | T;

export type SetData<T> = (action: UpdateAction<T>) => void;

export type UseServerDataResult<TData, TError> = UseQueryResult<
	TData,
	TError
> & {
	setData: SetData<TData>;
};
