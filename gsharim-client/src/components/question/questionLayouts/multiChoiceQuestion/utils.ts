import { ChoiceAnswer } from "@eco8200/data-models";

export function addId(currentAnswer: string[], id: string): string[] {
	return currentAnswer.concat(id);
}

export function removeId(currentAnswer: string[], id: string): string[] {
	return currentAnswer.filter((answerId: string) => answerId !== id);
}

export function isChecked(
	allAnswers: string[],
	currentAnswer: ChoiceAnswer
): boolean {
	return allAnswers.some(
		(submittedAnswer) => submittedAnswer === currentAnswer.id
	);
}
