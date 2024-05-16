import {
	AnswerTypes,
	MultiChoiceQuestionData,
	QuestionType,
	SingleChoiceQuestionData,
	TrueFalseQuestionData,
} from "@eco8200/data-models";

export const questionMocks: {
	[key: string]:
		| SingleChoiceQuestionData
		| MultiChoiceQuestionData
		| TrueFalseQuestionData;
} = {
	// Mock 1
	// Correct answer: 01013 (Canberra)
	"0101": {
		id: "0101",
		variant: QuestionType.SingleChoice,
		title: "What is the capital of Australia?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "01011", displayText: "Sydney" },
			{ id: "01012", displayText: "Melbourne" },
			{ id: "01013", displayText: "Canberra" },
		],
		submittedAnswer: "01011",
	},
	// Mock 2
	// Correct answer: 02022 (Jupiter)
	"0202": {
		id: "0202",
		variant: QuestionType.SingleChoice,
		title: "What is the largest planet in the solar system?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "02021", displayText: "Saturn" },
			{ id: "02022", displayText: "Jupiter" },
			{ id: "02023", displayText: "Mars" },
		],
		submittedAnswer: "02022",
	},
	// Mock 3
	// Correct answer: false
	"0303": {
		id: "0303",
		variant: QuestionType.TrueFalse,
		title: "Python is a functional programing languge.",
		description: "True or false?",
	},
	// Mock 4
	// Correct answer: 04042 04043 (Green, Purple)
	"0404": {
		id: "0404",
		variant: QuestionType.MultiChoice,
		title: "Which of these is not a primary color?",
		description: "Choose all that apply",
		possibleAnswers: [
			{ id: "04041", displayText: "Red" },
			{ id: "04042", displayText: "Green" },
			{ id: "04043", displayText: "Purple" },
		],
		submittedAnswer: ["04043"],
	},
	// Mock 5
	// Correct answer: 05051 (Mount Kilimanjaro)
	"0505": {
		id: "0505",
		variant: QuestionType.SingleChoice,
		title: "What is the highest mountain in Africa?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "05051", displayText: "Mount Kilimanjaro" },
			{ id: "05052", displayText: "Mount Everest" },
			{ id: "05053", displayText: "Mount Denali" },
		],
	},
	// Mock 6
	// Correct answer: 06063 (Carrot)
	"0606": {
		id: "0606",
		variant: QuestionType.SingleChoice,
		title: "Which of these is not a programming language?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "06061", displayText: "Java" },
			{ id: "06062", displayText: "Python" },
			{ id: "06063", displayText: "Carrot" },
		],
		submittedAnswer: "06063",
	},
	// Mock 7
	// Correct answer: 07071, 07072 07073, 07074 (Apple, Orange, Banana, Pear)
	"0707": {
		id: "0707",
		variant: QuestionType.MultiChoice,
		title: "Which of the following are fruits?",
		description: "Choose all that apply",
		possibleAnswers: [
			{ id: "07071", displayText: "Apple" },
			{ id: "07072", displayText: "Orange" },
			{ id: "07073", displayText: "Banana" },
			{ id: "07074", displayText: "Pear" },
		],
		submittedAnswer: ["07071", "07073", "07074"],
	},
	// Mock 8
	// Correct answer: true
	"0808": {
		id: "0808",
		variant: QuestionType.TrueFalse,
		title: "The Statue of Liberty was a gift from France to the United States.",
		description: "True or false?",
		submittedAnswer: false,
	},
	// Mock 9
	// Correct answer: 09092, 09093, 09094 (Texas, North Carolina, Alaska)
	"0909": {
		id: "0909",
		variant: QuestionType.MultiChoice,
		title: "Which of these are states in the USA",
		description: "Choose all that apply",
		possibleAnswers: [
			{ id: "09091", displayText: "Canada" },
			{ id: "09092", displayText: "Texas" },
			{ id: "09093", displayText: "North Carolina" },
			{ id: "09094", displayText: "Alaska" },
			{ id: "09095", displayText: "Columbia" },
		],
	},
	// Mock 10
	// Correct answer: 10102 (Madrid)
	"1010": {
		id: "1010",
		variant: QuestionType.SingleChoice,
		title: "What is the capital of Spain?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "10101", displayText: "Paris" },
			{ id: "10102", displayText: "Madrid" },
			{ id: "10103", displayText: "Berlin" },
		],
		submittedAnswer: "10102",
	},
	// Mock 11
	// Correct answer: 11112 (Australia)
	"1111": {
		id: "1111",
		variant: QuestionType.SingleChoice,
		title: "Which country is known for the Great Barrier Reef?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "11111", displayText: "Brazil" },
			{ id: "11112", displayText: "Australia" },
			{ id: "11113", displayText: "Canada" },
		],
		submittedAnswer: "11112",
	},
	// Mock 12
	// Correct answer: true
	"1212": {
		id: "1212",
		variant: QuestionType.TrueFalse,
		title: "A group of crows is called a murder.",
		description: "True or false?",
		submittedAnswer: false,
	},
	// Mock 13
	// Correct answer: 13131 (Au)
	"1313": {
		id: "1313",
		variant: QuestionType.SingleChoice,
		title: "What is the chemical symbol for gold?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "13131", displayText: "Au" },
			{ id: "13132", displayText: "Ag" },
			{ id: "13133", displayText: "Cu" },
		],
		submittedAnswer: "13131",
	},
	// Mock 14
	// Correct answer: 14142 (Blue whale)
	"1414": {
		id: "1414",
		variant: QuestionType.SingleChoice,
		title: "What is the largest mammal in the world?",
		description: "Choose one",
		possibleAnswers: [
			{ id: "14141", displayText: "Elephant" },
			{ id: "14142", displayText: "Blue whale" },
			{ id: "14143", displayText: "Hippopotamus" },
		],
		submittedAnswer: "14142",
	},
	// Mock 15
	// Correct answer: 15152 (Euro)
	"1515": {
		id: "1515",
		variant: QuestionType.MultiChoice,
		title: "Which of the following are legal tender in France?",
		description: "Choose all that apply",
		possibleAnswers: [
			{ id: "15151", displayText: "Dollar" },
			{ id: "15152", displayText: "Euro" },
			{ id: "15153", displayText: "Pound" },
			{ id: "15154", displayText: "Franc" },
		],
		submittedAnswer: ["15152", "15154"],
	},
};

export const questionAnswers: { [key: string]: AnswerTypes } = {
	"0101": "01013",
	"0202": "02022",
	"0303": false,
	"0404": ["04042", "04043"],
	"0505": "05051",
	"0606": "06063",
	"0707": ["07071", "07072", "07073", "07074"],
	"0808": true,
	"0909": ["09092", "09093", "09094"],
	"1010": "10102",
	"1111": "11112",
	"1212": true,
	"1313": "13131",
	"1414": "14142",
	"1515": ["15152"],
};
