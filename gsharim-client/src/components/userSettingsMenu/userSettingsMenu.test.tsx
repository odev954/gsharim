import { screen } from "@testing-library/react";
import { authContextMock, mockUseUpdateAvatar } from "mocks/testing/users";
import { AuthContext } from "contexts/auth";
import { mockUseProfileIcons } from "mocks/testing/assets";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import { describe, vi, it, expect } from "vitest";
import { useTranslation } from "react-i18next";
import { UserSettingsMenu } from ".";
import { loginButtonText, useOptionsAltText } from "./strings";

vi.mock("hooks/assets/useProfileIcons", () => ({
	useProfileIcons: mockUseProfileIcons,
}));
vi.mock("hooks/assets/useUpdateAvatar", () => ({
	useUpdateAvatar: mockUseUpdateAvatar,
}));

describe("checks userSettingsMenu apears", () => {
	const { t: translate } = useTranslation();

	it("authenticated", () => {
		renderWithTheme(
			<AuthContext.Provider value={authContextMock(true)}>
				<UserSettingsMenu />
			</AuthContext.Provider>
		);
		const imgElement = screen.getByAltText(translate(useOptionsAltText));
		const h4Element = screen.getByText(/ישראל ישראלי/i);
		expect(imgElement).toBeInTheDocument();
		expect(h4Element).toBeInTheDocument();
	});

	it("unauthenticated", () => {
		renderWithTheme(
			<AuthContext.Provider value={authContextMock(false)}>
				<UserSettingsMenu />
			</AuthContext.Provider>
		);
		const buttonElement = screen.getByText(translate(loginButtonText));
		expect(buttonElement).toBeInTheDocument();
	});
});
