import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TestEndPopup from "./testEndPopup";

describe("testEndPopup component", () => {
	test("renders testEndPopup without unAnswered questions", () => {
		render(
			<TestEndPopup
				popupState
				closePopup={vi.fn()}
				unAnsweredQuestions={0}
				submitTest={vi.fn()}
			/>
		);

		const pElement = screen.queryByText(/נותרו לך 0 שאלות שטרם ענית עליהן/i);

		expect(pElement).not.toBeInTheDocument();
	});

	test("renders testEndPopup with unAnswered questions", () => {
		render(
			<TestEndPopup
				popupState
				closePopup={vi.fn()}
				unAnsweredQuestions={2}
				submitTest={vi.fn()}
			/>
		);

		const pElement = screen.getByText(/נותרו לך 2 שאלות שטרם ענית עליהן/i);

		expect(pElement).toBeInTheDocument();
	});
});
