import { screen } from "@testing-library/react";
import { courseMock } from "mocks/testing/courses";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { RoadmapGraph } from ".";

describe("roadmap graph component, authenticated", () => {
	test("renders graph component", () => {
		routerRenderWithTheme(
			<RoadmapGraph
				courseId="0"
				chapter={courseMock.chapters[0]}
				lessonIdToRef={null}
			/>
		);

		const element = screen.getByText(
			courseMock.chapters[0].lessonsMetadata[0].name
		);
		expect(element).toBeInTheDocument();
	});
});
