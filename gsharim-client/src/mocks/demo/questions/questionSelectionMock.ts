import { IQuestion } from "@eco8200/data-models";
import { questionMocks } from "./questionMocks";

export function questionSelectionMock(questionId: string): IQuestion {
	return questionMocks[questionId];
}
