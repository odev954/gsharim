import { QuestionnaireSectionData, SectionType } from "@eco8200/data-models";

export function questionnaireMock(examMode: boolean): QuestionnaireSectionData {
	return {
		id: "01",
		questionnaireId: "01",
		variant: examMode ? SectionType.Test : SectionType.Quiz,
		title: "שאלון בדיקה",
		description: "הסבר על השאלון",
		questionIds: [
			"0101",
			"0202",
			"0303",
			"0404",
			"0505",
			"0606",
			"0707",
			"0808",
			"0909",
			"1010",
			"1111",
			"1212",
			"1313",
			"1414",
			"1515",
		],
	};
}
