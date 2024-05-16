import { isArray } from "lodash-es";

type Tuple<T, N extends number> = N extends N
	? number extends N
		? T[]
		: _TupleOf<T, N, []>
	: never;

type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;

export function validateArrayLength<T, N extends number>(
	array: T[],
	length: N
): array is Tuple<T, N> {
	return isArray<T>(array) && array.length === length;
}
