import {
	AnswerTypes,
	MultiChoiceQuestionData,
	QuestionType,
	SingleChoiceQuestionData,
	TrueFalseQuestionData,
} from "@eco8200/data-models";

export const questionMocks: {
	[id: string]:
		| SingleChoiceQuestionData
		| MultiChoiceQuestionData
		| TrueFalseQuestionData;
} = {
	// Mock 1
	// Correct answer: false
	"bcca8a6a-b55e-4ee0-935c-b85b61479566": {
		id: "bcca8a6a-b55e-4ee0-935c-b85b61479566",
		variant: QuestionType.TrueFalse,
		title: "1.3 הוא מטיפוס int",
		description: "",
	},
	// Mock 2
	// Correct answer: 5.04, 78.45
	"67fa4b4a-8be5-4790-a876-75e9d5b3cca2": {
		id: "67fa4b4a-8be5-4790-a876-75e9d5b3cca2",
		variant: QuestionType.MultiChoice,
		title: "בחר את כל המספרים מטיפוס float",
		description: "",
		possibleAnswers: [
			{ id: "9988650c-bcbb-4295-b2b9-efabe86c4371", displayText: "3" },
			{ id: "e2ced55c-1221-41c2-8bba-734a98e4ee13", displayText: "5.04" },
			{ id: "7fca8b78-b0b1-4308-8761-c5829334b1d5", displayText: "78.45" },
			{ id: "df176383-0e77-4391-9fe0-36273463a99d", displayText: "125" },
		],
	},
	// Mock 3
	// Correct answer: true
	"f1c68320-73e9-4803-8157-04c5e7adc881": {
		id: "f1c68320-73e9-4803-8157-04c5e7adc881",
		variant: QuestionType.TrueFalse,
		title: "60 הוא מטיפוס int",
		description: "",
	},
	// Mock 4
	// Correct answer: false
	"a6239b52-45eb-4d8b-a7df-f74c073d99ae": {
		id: "a6239b52-45eb-4d8b-a7df-f74c073d99ae",
		variant: QuestionType.TrueFalse,
		title: "‏int הוא טיפוס של טקסט",
		description: "",
	},
	// Mock 5
	// Correct answer: נקודה עשרונית
	"c7a854bc-2995-43ba-82e0-ab660fb746f2": {
		id: "c7a854bc-2995-43ba-82e0-ab660fb746f2",
		variant: QuestionType.SingleChoice,
		title: "ניתן לבהחין בין int ל-float בעזרת",
		description: "",
		possibleAnswers: [
			{ id: "3c46ef6e-913b-45ee-86a4-6eb5abe18095", displayText: "מרכאות" },
			{
				id: "285f73e9-3219-47ec-8b81-3f7392d07460",
				displayText: "לחלק את המספר ב-2 ולראות מה יוצא",
			},
			{
				id: "f55bb29d-08ef-4e60-ac4b-91919c33bc78",
				displayText: "נקודה עשרונית",
			},
			{
				id: "2023a16c-82a6-409b-8f22-a07ae0a526a9",
				displayText:
					"גודל המספר. אם המספר גדול מ-10 הוא מטיפוס float ואם הא קטן מ-10 הוא מטיפוס int",
			},
		],
	},
	// Mock 6
	// Correct answer: כשהיא מגיעה לסוף האיברים ברשימה
	"3bd90feb-e3bc-478e-aa72-eaabc3377a51": {
		id: "3bd90feb-e3bc-478e-aa72-eaabc3377a51",
		variant: QuestionType.SingleChoice,
		title: "מתי לולאת for עוצרת את פעולתה?",
		description: "",
		possibleAnswers: [
			{
				id: "c1782695-fa25-4854-b06a-e3866a90d8db",
				displayText: "כשהיא מגיעה לסוף האיברים ברשימה",
			},
			{
				id: "036a2e86-df67-471a-9efe-56fee28215eb",
				displayText: "כשהיא מגיעה לתנאי העצירה",
			},
			{
				id: "0ea233ed-a788-4f40-8d57-ec4768739f2f",
				displayText:
					"אחרי שהיא סיימה לבצע את כל הפעולות שהיא הייתה צריכה לעשות",
			},
			{
				id: "f13202bb-ac48-4554-86a5-c5a739524d87",
				displayText: "לולאת for ממשיכה לנצח",
			},
		],
	},
	// Mock 7
	// Correct answer: true
	"0975daab-1988-44f5-81bc-ac9044839e54": {
		id: "0975daab-1988-44f5-81bc-ac9044839e54",
		variant: QuestionType.TrueFalse,
		title: "שפת פייתון יודעת איזה קוד לבצע בתוך לולאה לפי ההזחה",
		description: "",
	},
	// Mock 8
	// Correct answer: 3
	"2904705a-43d4-4aa6-abb4-faaa14963551": {
		id: "2904705a-43d4-4aa6-abb4-faaa14963551",
		variant: QuestionType.SingleChoice,
		title: "קטע הקוד הבא ידפיס:",
		description: "my_list = [1, 2, 3, 4]\nprint(my_list[2])",
		possibleAnswers: [
			{ id: "6e0249b8-a125-4689-8071-bca960cc4895", displayText: "1" },
			{ id: "0cd0abe8-aa81-4646-8569-a7a99cac1be6", displayText: "2" },
			{ id: "327fcf96-f150-48ad-8808-d3942f2c7d55", displayText: "3" },
			{ id: "ae7f673d-8097-476c-a2c6-12d1bb3f96ab", displayText: "4" },
		],
	},
	// Mock 9
	// Correct answer: ['b', 'c', 'd']
	"dcf9393f-0105-45e7-90cc-702c35ded8e6": {
		id: "dcf9393f-0105-45e7-90cc-702c35ded8e6",
		variant: QuestionType.SingleChoice,
		title: "קטע הקוד הבא ידפיס:",
		description: "my_list = ['a', 'b', 'c', 'd']\nprint(my_list[1:4])",
		possibleAnswers: [
			{ id: "b1448dd9-3301-40e7-9d31-8e4baa62e22d", displayText: "abcd" },
			{ id: "d7d1b38d-ab21-4c5c-82b0-3489a6c28d16", displayText: "bcd" },
			{
				id: "e3ba7a28-4180-4ca9-bebf-007d315f9e27",
				displayText: "[a, b, c, d]",
			},
			{
				id: "a2af0e97-7f91-442d-a765-580d8905010f",
				displayText: "['b', 'c', 'd']",
			},
			{ id: "08d96ff4-ad77-42fe-9a20-938fd05c986e", displayText: "'bcd'" },
		],
	},
	// Mock 10
	// Correct answer: true
	"f2f5043e-b013-44c1-b453-a729cccedc0c": {
		id: "f2f5043e-b013-44c1-b453-a729cccedc0c",
		variant: QuestionType.TrueFalse,
		title: "ניתן לשים רשימה בתוך רשימה",
		description: "",
	},
};

export const questionAnswers: { [key: string]: AnswerTypes } = {
	"bcca8a6a-b55e-4ee0-935c-b85b61479566": false,
	"67fa4b4a-8be5-4790-a876-75e9d5b3cca2": [
		"e2ced55c-1221-41c2-8bba-734a98e4ee13",
		"7fca8b78-b0b1-4308-8761-c5829334b1d5",
	],
	"f1c68320-73e9-4803-8157-04c5e7adc881": true,
	"a6239b52-45eb-4d8b-a7df-f74c073d99ae": false,
	"c7a854bc-2995-43ba-82e0-ab660fb746f2":
		"f55bb29d-08ef-4e60-ac4b-91919c33bc78",
	"3bd90feb-e3bc-478e-aa72-eaabc3377a51":
		"c1782695-fa25-4854-b06a-e3866a90d8db",
	"0975daab-1988-44f5-81bc-ac9044839e54": true,
	"2904705a-43d4-4aa6-abb4-faaa14963551":
		"327fcf96-f150-48ad-8808-d3942f2c7d55",
	"dcf9393f-0105-45e7-90cc-702c35ded8e6":
		"a2af0e97-7f91-442d-a765-580d8905010f",
	"f2f5043e-b013-44c1-b453-a729cccedc0c": true,
};

export const questionExplanations: { [id: string]: string } = {
	"bcca8a6a-b55e-4ee0-935c-b85b61479566":
		"מספר מטיפוס int הוא מספר ללא נקודה עשרונית.",
	"67fa4b4a-8be5-4790-a876-75e9d5b3cca2":
		"רק מספרים עם נקודה עשרונית הם מטיפוס float.",
	"f1c68320-73e9-4803-8157-04c5e7adc881":
		"מספר ללא נקודה עשרונית הוא מספר מטיפוס int.",
	"a6239b52-45eb-4d8b-a7df-f74c073d99ae": "int הוא טיפוס של מספרים שלמים.",
	"c7a854bc-2995-43ba-82e0-ab660fb746f2":
		"‏float הוא טיפוס של שברים עשרונים ו-int הוא טיפוס של מספרים שלמים.",
	"3bd90feb-e3bc-478e-aa72-eaabc3377a51":
		"לולאת for רצה עד שהיא מגיעה לסוף האיברים ברשימה עליה היא עושה איטרציה.",
	"0975daab-1988-44f5-81bc-ac9044839e54":
		"בניגוד לשפות תכנות אחרות, פייתון משתמשת בהזחה על מנת להפריד קטעי קוד אחד מהשני.",
	"2904705a-43d4-4aa6-abb4-faaa14963551":
		"המספר במקום (index) 2 ברשימה הוא האיבר השלישי ברשימה.",
	"dcf9393f-0105-45e7-90cc-702c35ded8e6":
		"חיתוך מחזיר קטע מרשימה כמו שהוא, כאילו לקחתם את האיברים ושמתם רק אותם ברשימה.",
	"f2f5043e-b013-44c1-b453-a729cccedc0c":
		"ניתן לשים כל טיפוס בתוך רשימה, כולל רשימה.",
};
