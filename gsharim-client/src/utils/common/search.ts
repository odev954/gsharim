import { findIndex } from "lodash-es";

type IdObject = {
	id: string;
};

export function findIndexById(objects: IdObject[], id: string): number {
	const correctIndex = findIndex(objects, (item) => item.id === id);
	if (correctIndex === -1) {
		throw new Error("Did not find id");
	}
	return correctIndex;
}
