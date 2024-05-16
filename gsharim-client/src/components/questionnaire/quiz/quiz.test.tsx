import { render, screen } from "@testing-library/react";
import { questionnaireMock } from "mocks/testing/questionnaire";
import {
	mockUseQuestion,
	mockUseQuestionSubmit,
	questionSelectionMock,
} from "mocks/testing/questions";
import React, { useState } from "react";
import { vi } from "vitest";
import { useTranslation } from "react-i18next";
import { UseStateMock } from "../types";
import Quiz from "./quiz";
import { victoryMessage } from "./quizEnd/strings";

vi.mock("react", async () => {
	const react = await vi.importActual<typeof React>("react");
	return { ...react, useState: vi.fn(react.useState) };
});

vi.mock("hooks/question/useQuestion", () => {
	return {
		useQuestion: vi.fn((questionId: string) => mockUseQuestion({ questionId })),
	};
});

vi.mock("hooks/question/useQuestionSubmit", () => {
	return { useQuestionSubmit: mockUseQuestionSubmit };
});

const { title, description, questionIds } = questionnaireMock(false);

describe("quiz component tests", () => {
	const { t: translate } = useTranslation();

	test("renders quiz and checks that it is on the starting screen", () => {
		// before quiz
		render(
			<Quiz
				title={title}
				description={description}
				questionIds={questionIds}
				onQuizDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(title);

		expect(pElement).toBeInTheDocument();
	});
	test("renders quiz and checks that it is on a question screen", () => {
		// normal question
		const useStateMock = useState as UseStateMock;
		useStateMock.mockReturnValueOnce([0, vi.fn()]);
		render(
			<Quiz
				title={title}
				description={description}
				questionIds={questionIds}
				onQuizDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(
			questionSelectionMock(questionIds[0]).title
		);

		expect(pElement).toBeInTheDocument();
	});
	test("renders quiz and checks that it is on quizEnd screen", () => {
		// quizEnd
		const useStateMock = useState as UseStateMock;
		useStateMock.mockReturnValueOnce([15, vi.fn()]);
		render(
			<Quiz
				title={title}
				description={description}
				questionIds={questionIds}
				onQuizDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(translate(victoryMessage));

		expect(pElement).toBeInTheDocument();
	});
});
