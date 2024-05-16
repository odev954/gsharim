import { QuestionnaireSectionData } from "@eco8200/data-models";
import { questionnaireMocks } from "./questionnaireMocks";

export function questionnaireSelectionMock(
	id: string
): QuestionnaireSectionData {
	return questionnaireMocks[id];
}
