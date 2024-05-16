import { screen } from "@testing-library/react";
import GreenIcon from "assets/header/headerMonsterIcons/greenIcon.svg";
import { mockUseProfileIcons } from "mocks/testing/assets";
import { mockUseUpdateAvatar } from "mocks/testing/users";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import { describe, vi, it, expect } from "vitest";
import { UserIcon } from ".";

vi.mock("hooks/assets/useProfileIcons", () => ({
	useProfileIcons: mockUseProfileIcons,
}));
vi.mock("hooks/assets/useUpdateAvatar", () => ({
	useUpdateAvatar: mockUseUpdateAvatar,
}));

describe("user icon", () => {
	it("renders user icon default values image", () => {
		renderWithTheme(<UserIcon />);
		const image = screen.getByTestId("AccountCircleIcon");
		expect(image).toBeDefined();
	});

	it("renders user icon image, with custom icon", () => {
		renderWithTheme(<UserIcon iconSrc={GreenIcon} />);
		const image = screen.getByRole("img");
		expect(image).toHaveAttribute("src", GreenIcon);
	});
});
