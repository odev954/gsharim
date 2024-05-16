import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import reactRouter from "react-router-dom";
import { tasksMock } from "mocks/testing/tasks";
import useTask from "hooks/tasks/useTask";
import TaskLayout from "./index";

vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual<typeof reactRouter>("react-router-dom");
	return {
		...mod,
		useParams: vi.fn(() => {
			return {
				courseId: "123",
			};
		}),
	};
});

vi.mock("hooks/tasks/useTask", () => ({
	default: vi.fn(),
}));

vi.mock("hooks/navigation/useSetSectionBlocking", () => ({
	useSetSectionBlocking: () => ({ approveSection: vi.fn() }),
}));

vi.mock("hooks/display/useIsScrollComplete", () => ({
	default: vi.fn(() => {
		return { isScrollComplete: true };
	}),
}));

describe("lesson layout component", () => {
	const queryClient = new QueryClient();
	beforeEach(() => {
		const useTaskMock = useTask as Mock;
		useTaskMock.mockReturnValue(null);
	});

	it("renders task layout component, with presentation section", () => {
		// the text in the presentation
		const testText = "ברוכים הבאים לקורס פייתון";
		const useTaskMock = useTask as Mock;
		useTaskMock.mockReturnValue({
			data: tasksMock["0f1c280a-dc7b-4059-a1c2-e75797ed84b7"],
			setData: vi.fn(),
		});
		const { container: taskLayout } = routerRenderWithTheme(
			<QueryClientProvider client={queryClient}>
				<TaskLayout />
			</QueryClientProvider>
		);
		const element = taskLayout.getElementsByTagName("iframe");
		expect(element[0].innerHTML.includes(testText));
	});

	it("renders task layout component, with instruction section", () => {
		const testText = "יצירת קלידים";
		const useTaskMock = useTask as Mock;
		useTaskMock.mockReturnValue({
			data: tasksMock["e126bcbf-6429-4c6b-b2e4-99e21f895cac"],
			setData: vi.fn(),
		});
		routerRenderWithTheme(
			<QueryClientProvider client={queryClient}>
				<TaskLayout />
			</QueryClientProvider>
		);

		const element = screen.getByText(testText);
		expect(element).toBeInTheDocument();
	});
});
