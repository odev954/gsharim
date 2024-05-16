import { kidImage } from "assets/welcomePageImages";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import Paragraph from ".";

describe("paragraph", () => {
	const testTitle = "Test Title";
	const testBody = "Test Body";

	test("renders paragraph's image, title and body", () => {
		renderWithTheme(
			<Paragraph
				title={testTitle}
				text={testBody}
				image={{
					src: kidImage,
					imageAlt: "תמונה של ילד",
				}}
				isTextBeforeImage={false}
			/>
		);
		screen.getByRole("img");
		screen.getByText(testTitle);
		screen.getByText(testBody);
	});
});
