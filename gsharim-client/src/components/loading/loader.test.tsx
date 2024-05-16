import { queryByAttribute } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import { Box } from "@mui/material";
import { Loader } from "./loader";

describe("lazy loading component", () => {
	test("load other loader", () => {
		const dom = renderWithTheme(
			<Loader LoaderComponent={() => <Box id="myLoader" />} />
		);
		const getById = queryByAttribute.bind(null, "id");
		const loader = getById(dom.container, "myLoader");
		expect(loader).not.toBeNull();
	});
	test("load default loader", () => {
		const dom = renderWithTheme(<Loader />);
		const getById = queryByAttribute.bind(null, "id");
		const loader = getById(dom.container, "lottie-page-loader");
		expect(loader).not.toBeNull();
	});
});
