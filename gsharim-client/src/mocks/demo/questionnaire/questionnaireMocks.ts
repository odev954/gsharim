import { QuestionnaireSectionData, SectionType } from "@eco8200/data-models";

export const questionnaireMocks: { [id: string]: QuestionnaireSectionData } = {
	"0302": {
		id: "d24be208-b1dd-454e-8a56-e44da6dbd486",
		questionnaireId: "0302",
		variant: SectionType.Quiz,
		title: "שאלון - טיפוסים של מספרים",
		description:
			"ועכשיו נראה אם באמת הקשבתם ;)\nבשאלון הבא תבדקו את הידע שלכם בטיפוסים של מספרים.",
		questionIds: [
			"bcca8a6a-b55e-4ee0-935c-b85b61479566",
			"67fa4b4a-8be5-4790-a876-75e9d5b3cca2",
			"f1c68320-73e9-4803-8157-04c5e7adc881",
			"a6239b52-45eb-4d8b-a7df-f74c073d99ae",
			"c7a854bc-2995-43ba-82e0-ab660fb746f2",
		],
	},
	"0902": {
		id: "b84a6527-3b0b-4276-8cc3-273050e5f056",
		questionnaireId: "0902",
		variant: SectionType.Quiz,
		title: "שאלון - לולאות",
		description: "חושבים שאתם יודעים לולאות?\nבואו נראה!",
		questionIds: [
			"3bd90feb-e3bc-478e-aa72-eaabc3377a51",
			"0975daab-1988-44f5-81bc-ac9044839e54",
		],
	},
	"1202": {
		id: "0c9936cc-d779-4a34-afec-bd3b34b960c9",
		questionnaireId: "1202",
		variant: SectionType.Quiz,
		title: "שאלון - רשימות",
		description: "אז כמה באמת הבנו על רשימות?\nבואו נבדוק.",
		questionIds: [
			"2904705a-43d4-4aa6-abb4-faaa14963551",
			"dcf9393f-0105-45e7-90cc-702c35ded8e6",
			"f2f5043e-b013-44c1-b453-a729cccedc0c",
		],
	},
};
