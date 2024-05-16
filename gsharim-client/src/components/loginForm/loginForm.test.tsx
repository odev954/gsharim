import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import LoginForm from ".";
import {
	loginButtonText,
	loginSubTitle,
	loginTitle,
	signUpButtonText,
} from "./strings";

describe("loginForm component, authenticated", () => {
	test("renders loginForm", () => {
		renderWithTheme(<LoginForm />);
		screen.getByText(loginButtonText);
		screen.getByText(signUpButtonText);
		screen.getByText(loginTitle + loginSubTitle);
	});
});
