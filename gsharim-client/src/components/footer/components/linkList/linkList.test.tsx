import { screen } from "@testing-library/react";
import linkList from "mocks/testing/supportLinks/linksMock";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import LinkList from "./linkList";

describe("linkList component", () => {
	test("renders linkList", () => {
		routerRenderWithTheme(<LinkList LinksInfo={linkList} />);
		const aElement = screen.getByText(/link/i);
		expect(aElement).toBeInTheDocument();
	});
});
