import { FoodTextureDescription } from "@eco8200/data-models";
import { sample } from "lodash-es";
import { SnakeSetupMessage } from "./snakeGameSectionContainer";
import { SetupMessageIntialPosition, SetupMessageAutoMove } from "./consts";

export function createSetupMessage(boardWidth: number): SnakeSetupMessage {
	return {
		width: boardWidth,
		intialPosition: SetupMessageIntialPosition,
		autoMove: SetupMessageAutoMove,
	};
}

export function getPopupText(
	foodName: string,
	foodItems: FoodTextureDescription[]
): string {
	const possibleFoodItems = foodItems.filter((item) => item.name === foodName);
	const selectedFoodItem = sample(possibleFoodItems);
	const selectedPopupText = sample(selectedFoodItem?.popupMessages || []);
	const text = selectedPopupText?.hebrew
		? selectedPopupText.text.split("").reverse().join("")
		: selectedPopupText?.text;
	return text || "";
}
