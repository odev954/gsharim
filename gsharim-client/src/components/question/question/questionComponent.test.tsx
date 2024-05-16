import { render, screen } from "@testing-library/react";
import {
	questionCheckMock,
	questionSelectionMock,
} from "mocks/testing/questions";
import { vi } from "vitest";
import { questionAnswers } from "mocks/testing/questions/questionMocks";
import { useTranslation } from "react-i18next";
import QuestionComponent from "./questionComponent";
import { buttonBack, buttonNext } from "../strings";
import { buttonSubmit } from "./strings";
import { answerText } from "./explanation/strings";

describe("tests questionComponent", () => {
	const { t: translate } = useTranslation();

	test("renders QuestionComponent with back button and checks that it appears", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				isAnswerBeingSubmitted={false}
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				handleBack={vi.fn()}
				disabled={false}
			/>
		);

		const buttonElement = screen.getByText(translate(buttonBack));

		expect(buttonElement).toBeInTheDocument();
	});

	test("renders QuestionComponent without back button and checks that it doesn't appear", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				isAnswerBeingSubmitted={false}
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				disabled={false}
			/>
		);

		const buttonElement = screen.queryByText(translate(buttonBack));

		expect(buttonElement).not.toBeInTheDocument();
	});

	test("renders QuestionComponent before answer submition and checks that the submition button has the right text", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				isAnswerBeingSubmitted={false}
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				disabled={false}
			/>
		);

		const buttonElement = screen.getByText(translate(buttonSubmit));

		expect(buttonElement).toBeInTheDocument();
	});

	test("renders QuestionComponent during answer submition and checks that the loader appears", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				isAnswerBeingSubmitted
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				disabled
			/>
		);

		const buttonElement = screen.getByRole("progressbar");

		expect(buttonElement).toBeInTheDocument();
	});

	test("renders QuestionComponent with correct answer submition and checks that next button appears", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				isAnswerBeingSubmitted={false}
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				onAnswerChange={vi.fn()}
				checkResult={questionCheckMock("0101", questionAnswers["0101"])}
				handleClick={vi.fn()}
				disabled={false}
			/>
		);

		const buttonElement = screen.getByText(translate(buttonNext));

		expect(buttonElement).toBeInTheDocument();
	});

	test("renders QuestionComponent with wrong answer submition and checks that explanation appears", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				isAnswerBeingSubmitted={false}
				isExplanationOpen
				closeExplanation={vi.fn()}
				onAnswerChange={vi.fn()}
				checkResult={questionCheckMock("0101", "")}
				handleClick={vi.fn()}
				disabled={false}
			/>
		);

		const pElement = screen.getByText(translate(answerText));

		expect(pElement).toBeInTheDocument();
	});

	test("renders QuestionComponent with custom answer submition text", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				options={{
					submitionText: "Timmy has 15 years work experience. He's 9!",
				}}
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				isAnswerBeingSubmitted={false}
				onAnswerChange={vi.fn()}
				handleClick={vi.fn()}
				disabled={false}
			/>
		);

		const buttonElement = screen.getByText(
			"Timmy has 15 years work experience. He's 9!"
		);

		expect(buttonElement).toBeInTheDocument();
	});

	test("renders QuestionComponent with custom success text", () => {
		render(
			<QuestionComponent
				question={questionSelectionMock("0101")}
				options={{
					successText: "A for avarage",
				}}
				isExplanationOpen={false}
				closeExplanation={vi.fn()}
				isAnswerBeingSubmitted={false}
				onAnswerChange={vi.fn()}
				checkResult={questionCheckMock("0101", questionAnswers["0101"])}
				handleClick={vi.fn()}
				disabled={false}
			/>
		);

		const buttonElement = screen.getByText("A for avarage");

		expect(buttonElement).toBeInTheDocument();
	});
});
