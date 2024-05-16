import { fireEvent, screen } from "@testing-library/react";
import {
	courseNavigationNextLessonMock,
	courseNavigationPreviousLessonMock,
} from "mocks/testing/lesson";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { courseNavigationEndCourseMock } from "mocks/testing/lesson/useCourseNavigationObject";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Mock, vi } from "vitest";
import useTask from "hooks/tasks/useTask";
import { tasksMock } from "mocks/testing/tasks";
import { wellDone } from "components/finishCoursePopup/strings";
import TaskFooter from "./taskFooter";
import { finishCourse, nextLesson, previousLesson } from "./strings";

vi.mock("hooks/tasks/useTask", () => ({
	default: vi.fn(),
}));

describe("Task footer component", () => {
	const queryClient = new QueryClient();
	it("renders and clicks next button", () => {
		const useTaskMock = useTask as Mock;
		useTaskMock.mockReturnValue({
			data: tasksMock["e126bcbf-6429-4c6b-b2e4-gogogagacac"],
		});
		routerRenderWithTheme(
			<QueryClientProvider client={queryClient}>
				<TaskFooter courseNavigation={courseNavigationNextLessonMock} />
			</QueryClientProvider>
		);
		const nextLessonButton = screen.getByText(nextLesson);
		fireEvent.click(nextLessonButton);
		expect(courseNavigationNextLessonMock.goNext).toHaveBeenCalledTimes(1);
	});

	it("renders and clicks back button", () => {
		const useTaskMock = useTask as Mock;
		useTaskMock.mockReturnValue({
			data: tasksMock["e126bcbf-6429-4c6b-b2e4-gogogagacac"],
		});
		routerRenderWithTheme(
			<QueryClientProvider client={queryClient}>
				<TaskFooter courseNavigation={courseNavigationPreviousLessonMock} />
			</QueryClientProvider>
		);
		const previousLessonButton = screen.getByText(previousLesson);
		fireEvent.click(previousLessonButton);
		expect(courseNavigationPreviousLessonMock.goPrevious).toHaveBeenCalledTimes(
			1
		);
	});

	it("renders and clicks end course button that opens a modal", () => {
		const useTaskMock = useTask as Mock;
		useTaskMock.mockReturnValue({
			data: tasksMock["e126bcbf-6429-4c6b-b2e4-gogogagacac"],
		});
		routerRenderWithTheme(
			<QueryClientProvider client={queryClient}>
				<TaskFooter courseNavigation={courseNavigationEndCourseMock} />
			</QueryClientProvider>
		);

		const endCourseButton = screen.getByText(finishCourse);
		fireEvent.click(endCourseButton);
		screen.getByText(wellDone);
	});
});
