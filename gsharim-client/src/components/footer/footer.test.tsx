import { screen } from "@testing-library/react";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import Footer from "./footer";
import { contact, rightsReserved, emailAddress } from "./strings";

describe("footer component", () => {
	test("renders footer", () => {
		routerRenderWithTheme(<Footer />);

		const div1Element = screen.getByText(rightsReserved);
		const div2Element = screen.getByText(contact);
		const div3Element = screen.getByText(emailAddress);

		expect(div1Element).toBeInTheDocument();
		expect(div2Element).toBeInTheDocument();
		expect(div3Element).toBeInTheDocument();
	});
});
