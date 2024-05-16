import { TrueFalseQuestionData } from "@eco8200/data-models";
import { act, render, screen } from "@testing-library/react";
import { questionSelectionMock } from "mocks/testing/questions";
import { vi } from "vitest";
import TrueFalseQuestion from ".";
import { incorrectAnswer } from "./strings";

describe("trueFalseQuestion component", () => {
	test("renders trueFalseQuestion and checks that when an answer is clicked it passes the right data", () => {
		// The test checks that a given answer passes the right value when clicked by doing the following:
		// 1. Getting the button element with the text "לא נכון".
		// 2. Clicking on the button.
		// 3. Asserting that the value passed by the click was false.
		// Note: The question being checked shouldn't have submittedAnswer or the test may fail.
		const questionMock = questionSelectionMock("0303") as TrueFalseQuestionData;
		const onAnswerChangeMock = vi.fn();
		render(
			<TrueFalseQuestion
				question={questionMock}
				onAnswerChange={onAnswerChangeMock}
			/>
		);

		onAnswerChangeMock.mockReset();
		const lableElement = screen.getByText(incorrectAnswer);
		act(() => {
			lableElement.click();
		});
		const [call]: boolean[][] = onAnswerChangeMock.mock.calls;
		const [clickedAnswer] = call;
		expect(clickedAnswer).toBe(false);
	});
});
