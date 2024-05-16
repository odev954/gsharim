import { isNil } from "lodash";
import { Active } from "./types";

export function isActive<T extends { progress?: number }>(
	object: T
): object is Active<T> {
	return (
		!isNil(object.progress) && object.progress >= 0 && object.progress <= 100
	);
}
