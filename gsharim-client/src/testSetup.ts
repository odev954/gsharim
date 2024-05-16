import "@testing-library/jest-dom";
import "vitest-canvas-mock";
import { cleanup } from "@testing-library/react";
import { afterEach, vi, beforeAll, Mock } from "vitest";
import i18next, { useTranslation } from "react-i18next";

vi.mock("react-i18next", async () => {
	const actual = await vi.importActual<typeof i18next>("react-i18next");
	return {
		...actual,
		useTranslation: vi.fn(),
	};
});
const mockUseTranslation = useTranslation as Mock;
beforeAll(
	mockUseTranslation.mockImplementation(
		vi.fn(() => ({
			t: (key: string): string => key,
			i18n: {
				language: "he",
				changeLanguage: vi.fn<[string]>(),
				on: vi.fn(),
				off: vi.fn(),
				dir: vi.fn(() => "rtl"),
			},
		}))
	)
);
afterEach(cleanup);
