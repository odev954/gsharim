import { XYPosition } from "./types";

export function parsePosition(
	positionString: string | null
): [number, number] | null {
	if (positionString) {
		const position: XYPosition = JSON.parse(positionString);
		return [position.x, position.y];
	}
	return null;
}
