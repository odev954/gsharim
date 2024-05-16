import { Typography } from "@mui/material";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import { RoadmapCurve } from ".";

function ChildComponent(): JSX.Element {
	const childText = "Rendering With Child";
	return <Typography>{childText}</Typography>;
}

describe("roadmap curve component", () => {
	test("renders component, directions", () => {
		renderWithTheme(<RoadmapCurve direction="right" />);
		renderWithTheme(<RoadmapCurve direction="left" />);
	});
	test("renders component, with child, without alignment", () => {
		const childText = "Rendering With Child";
		renderWithTheme(
			<RoadmapCurve direction="right">
				<ChildComponent />
			</RoadmapCurve>
		);

		const element = screen.getByText(childText);
		expect(element).toBeInTheDocument();
	});
	test("renders component, with child at top", () => {
		const childText = "Rendering With Child";
		renderWithTheme(
			<RoadmapCurve direction="right" childAlign="top">
				<ChildComponent />
			</RoadmapCurve>
		);
		const element = screen.getByText(childText);
		expect(element).toBeInTheDocument();
	});
	test("renders component, with child at bottom", () => {
		const childText = "Rendering With Child";
		renderWithTheme(
			<RoadmapCurve direction="right" childAlign="bottom">
				<ChildComponent />
			</RoadmapCurve>
		);
		const element = screen.getByText(childText);
		expect(element).toBeInTheDocument();
	});
});
