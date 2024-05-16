import { screen } from "@testing-library/react";
import { mockUseCourse } from "mocks/testing/courses";
import { coursesMetadataMock } from "mocks/testing/courses/coursesMetadataMock";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { describe, vi, it } from "vitest";
import CourseListItem from "./courseListItemContainer";
import {
	difficulty,
	hoursPostfix,
	imageAlt,
	minutesPostfix,
	minutesPrefix,
} from "./strings";

vi.mock("hooks/courses/useCourse", () => ({
	useCourse: mockUseCourse,
}));

describe("courseListItem component", () => {
	it("renders courseListItem", () => {
		routerRenderWithTheme(
			<CourseListItem courseMetadata={coursesMetadataMock[1]} />
		);
		screen.getByText(/מבוא לפייתון/i);
		screen.getByAltText(imageAlt);
		screen.getByText(`1 ${hoursPostfix} ${minutesPrefix}40 ${minutesPostfix}`);
		screen.getByText(`${difficulty}0`);
	});
});
