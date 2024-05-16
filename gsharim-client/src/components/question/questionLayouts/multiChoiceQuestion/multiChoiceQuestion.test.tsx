import { MultiChoiceQuestionData } from "@eco8200/data-models";
import { act, render, screen } from "@testing-library/react";
import { questionSelectionMock } from "mocks/testing/questions";
import { vi } from "vitest";
import MultiChoiceQuestion from ".";

describe("multiChoiceQuestion component", () => {
	test("renders multiChoiceQuestion and checks that when an answer is clicked it passes the right data", () => {
		// The test checks that a given answer passes the right id when clicked by doing the following:
		// 1. Getting the first answer of a question.
		// 2. Getting the element that has the answer's text.
		// 3. Clicking on the element.
		// 4. Finding an answer with the id passed by the click.
		// 5. Asserting that the text from the first answer is the same text as the second answer.
		// Note: The question being checked shouldn't have 2 of the same answer nor submittedAnswer or the test may fail.
		const questionMock = questionSelectionMock(
			"0909"
		) as MultiChoiceQuestionData;
		const onAnswerChangeMock = vi.fn();
		render(
			<MultiChoiceQuestion
				question={questionMock}
				onAnswerChange={onAnswerChangeMock}
			/>
		);

		onAnswerChangeMock.mockReset();
		const lableElement = screen.getByText(
			questionMock.possibleAnswers[0].displayText
		);
		act(() => {
			lableElement.click();
		});
		const [call]: string[][][] = onAnswerChangeMock.mock.calls;
		const [clickedAnswerIds] = call;
		const [clickedAnswerId] = clickedAnswerIds;
		const clickedAnswer = questionMock.possibleAnswers.find(
			(answer) => answer.id === clickedAnswerId
		);
		expect(clickedAnswer?.displayText).toBe(lableElement.textContent);
	});
	test("renders multiChoiceQuestion and checks that an answer can be unchecked", () => {
		// The test checks that when a checkbox is unchecked its id is removed from the answer list by doing the following:
		// 1. Getting the element of the first answer of a question by its text.
		// 2. Clicking on the element twice.
		// 3. Asserting that the Id is not in the answer list.
		// Note: The question being checked shouldn't have submittedAnswer or the test will fail.
		const questionMock = questionSelectionMock(
			"0909"
		) as MultiChoiceQuestionData;
		const onAnswerChangeMock = vi.fn();
		render(
			<MultiChoiceQuestion
				question={questionMock}
				onAnswerChange={onAnswerChangeMock}
			/>
		);

		onAnswerChangeMock.mockReset();
		const lableElement = screen.getByText(
			questionMock.possibleAnswers[0].displayText
		);
		act(() => {
			lableElement.click();
			lableElement.click();
		});
		const clickedAnswerIds = onAnswerChangeMock.mock.calls[1][0];
		expect(clickedAnswerIds).toStrictEqual([]);
	});
});
