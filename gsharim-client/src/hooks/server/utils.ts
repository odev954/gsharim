import { cloneDeep } from "lodash-es";
import { MutableRefObject } from "react";

export function createFetchPromise(
	resolveRef: MutableRefObject<VoidFunction | undefined>,
	rejectRef: MutableRefObject<VoidFunction | undefined>
): Promise<void> {
	const promise = new Promise<void>((res, rej) => {
		// eslint-disable-next-line no-param-reassign
		resolveRef.current = res;
		// eslint-disable-next-line no-param-reassign
		rejectRef.current = rej;
	});
	return promise;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeObjectKey(obj: any, keyParts: string[]): void {
	if (!obj) {
		return;
	}
	if (keyParts.length === 1) {
		// eslint-disable-next-line no-param-reassign
		delete obj[keyParts[0]];
		return;
	}
	const subKey = keyParts.slice(1);
	if (keyParts[0] === "*" && Array.isArray(obj)) {
		obj.forEach((subItem) => {
			if (typeof subItem === "object") {
				removeObjectKey(subItem, subKey);
			}
		});
		return;
	}
	const objectAtKey = obj[keyParts[0]];
	if (typeof objectAtKey === "object") {
		removeObjectKey(objectAtKey, subKey);
	}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeObjectKeys(obj: any, keys: string[]): object {
	const newObj = cloneDeep(obj);
	keys.forEach((key) => {
		const keyParts = key.split(".");
		removeObjectKey(newObj, keyParts);
	});
	return newObj;
}
