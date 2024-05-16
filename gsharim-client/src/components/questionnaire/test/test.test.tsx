import { render, screen } from "@testing-library/react";
import { errorText } from "components/question/error/errorPopup/strings";
import { useTestSubmit } from "hooks/questionnaire/useTestSubmit";
import {
	mockUseTestSubmit,
	questionnaireMock,
} from "mocks/testing/questionnaire";
import {
	mockUseQuestion,
	mockUseTestQuestionSubmit,
	questionSelectionMock,
} from "mocks/testing/questions";
import { Mock, vi } from "vitest";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TestSection from ".";
import { questionCountText } from "./testAnalytics/strings";
import { title as testEndPopupTitle } from "./testEndPopup/strings";
import { UseStateMock } from "../types";

vi.mock("react", async () => {
	const react = await vi.importActual<typeof React>("react");
	return { ...react, useState: vi.fn(react.useState) };
});

vi.mock("hooks/questionnaire/useTestSubmit", () => {
	return { useTestSubmit: vi.fn() };
});

vi.mock("hooks/question/useQuestion", () => {
	return {
		useQuestion: (questionId: string) => mockUseQuestion({ questionId }),
	};
});

vi.mock("hooks/question/useTestQuestionSubmit", () => {
	return { useTestQuestionSubmit: mockUseTestQuestionSubmit };
});

type UseTestSubmitMock = Mock<
	Parameters<typeof useTestSubmit>,
	ReturnType<typeof useTestSubmit>
>;

const {
	questionnaireId: testId,
	title,
	description,
	questionIds,
} = questionnaireMock(true);

describe("test component tests", () => {
	const { t: translate } = useTranslation();
	beforeAll(() => {
		const useTestSubmitMock = useTestSubmit as UseTestSubmitMock;
		useTestSubmitMock.mockReturnValue(mockUseTestSubmit());
	});
	test("renders test and checks that it is on the starting screen", () => {
		// before test
		render(
			<TestSection
				testId={testId}
				title={title}
				description={description}
				questionIds={questionIds}
				setTestDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(title);

		expect(pElement).toBeInTheDocument();
	});
	test("renders test and checks that it is on a question screen", () => {
		// normal question
		const useStateMock = useState as UseStateMock;
		useStateMock.mockReturnValueOnce([0, vi.fn()]);
		render(
			<TestSection
				testId={testId}
				title={title}
				description={description}
				questionIds={questionIds}
				setTestDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(
			questionSelectionMock(questionIds[0]).title
		);

		expect(pElement).toBeInTheDocument();
	});
	test("renders test and checks that testEndPopup is open", () => {
		// testEndPopup
		const useStateMock = useState as UseStateMock;
		useStateMock.mockReturnValueOnce([14, vi.fn()]);
		useStateMock.mockReturnValueOnce([true, vi.fn()]);
		render(
			<TestSection
				testId={testId}
				title={title}
				description={description}
				questionIds={questionIds}
				setTestDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(translate(testEndPopupTitle));

		expect(pElement).toBeInTheDocument();
	});
	test("renders test and checks that the error component is shown when submitting the test fails", () => {
		// submit error
		const useStateMock = useState as UseStateMock;
		useStateMock.mockReturnValueOnce([14, vi.fn()]);
		const useTestSubmitMock = useTestSubmit as UseTestSubmitMock;
		useTestSubmitMock.mockReturnValue(mockUseTestSubmit({ isError: true }));
		render(
			<TestSection
				testId={testId}
				title={title}
				description={description}
				questionIds={questionIds}
				setTestDone={vi.fn()}
			/>
		);

		const pElement = screen.getByText(translate(errorText));

		expect(pElement).toBeInTheDocument();
	});
	test("renders test and checks that it is on testAnalytics screen", () => {
		// testAnalytics
		const useStateMock = useState as UseStateMock;
		useStateMock.mockReturnValueOnce([15, vi.fn()]);
		const useTestSubmitMock = useTestSubmit as UseTestSubmitMock;
		useTestSubmitMock.mockReturnValue(mockUseTestSubmit({ isSuccess: true }));
		render(
			<TestSection
				testId={testId}
				title={title}
				description={description}
				questionIds={questionIds}
				setTestDone={vi.fn()}
			/>
		);
		const pElement = screen.getByText(translate(questionCountText).trim());

		expect(pElement).toBeInTheDocument();
	});
});

// In reference to questionnaireMock:
// 1. beforeTest         reqs: useTestSubmit idle       useState -1 false
// 2. normal question    reqs: useTestSubmit idle       useState 0-13 false
// 3. testEndPopup       reqs: useTestSubmit idle       useState 14 true
// 4. submit error       reqs: useTestSubmit error      useState 14 false
// 5. testAnalytics      reqs: useTestSubmit success    useState 15 false
