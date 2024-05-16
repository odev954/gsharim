import { fireEvent, screen } from "@testing-library/react";
import { lessonMetadataMockList } from "mocks/testing/courses";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { describe, vi, it, expect } from "vitest";
import { RoadmapLesson } from "./roadmapLesson";

describe("roadmap lesson component", () => {
	const mockedUseNavigate = vi.fn<[string]>();

	it("renders and handles roadmap lesson", () => {
		routerRenderWithTheme(
			<RoadmapLesson
				lessonMetadata={lessonMetadataMockList[0]}
				navigateToLesson={mockedUseNavigate}
			/>
		);
		const lesson = screen.getByText(lessonMetadataMockList[0].name);
		expect(lesson).toBeInTheDocument();
		fireEvent.click(lesson);
		expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
		expect(mockedUseNavigate).toHaveBeenCalledWith("0");
	});
});
