import { render, screen } from "@testing-library/react";
import { questionSelectionMock } from "mocks/testing/questions";
import { vi } from "vitest";
import { useTranslation } from "react-i18next";
import { buttonNext } from "../strings";
import { buttonTestSubmit } from "./strings";
import TestQuestionComponent from "./testQuestionComponent";

describe("testQuestionComponent component", () => {
	const { t: translate } = useTranslation();

	test("not last", () => {
		render(
			<TestQuestionComponent
				question={questionSelectionMock("0101")}
				questionNumber={1}
				isAnswerBeingSubmitted={false}
				isLast={false}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				handleBack={vi.fn()}
			/>
		);

		const buttonElement = screen.getByText(translate(buttonNext));

		expect(buttonElement).toBeInTheDocument();
	});

	test("last", () => {
		render(
			<TestQuestionComponent
				question={questionSelectionMock("0101")}
				questionNumber={1}
				isAnswerBeingSubmitted={false}
				isLast
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				handleBack={vi.fn()}
			/>
		);

		const buttonElement = screen.getByText(translate(buttonTestSubmit));

		expect(buttonElement).toBeInTheDocument();
	});

	test("renders TestQuestionComponent during answer submition and checks that the loader appears", () => {
		render(
			<TestQuestionComponent
				question={questionSelectionMock("0101")}
				questionNumber={1}
				isAnswerBeingSubmitted
				isLast={false}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				handleBack={vi.fn()}
			/>
		);

		const buttonElement = screen.getByRole("progressbar");

		expect(buttonElement).toBeInTheDocument();
	});
});
