import { screen } from "@testing-library/react";
import { mockUseProfileIcons } from "mocks/testing/assets";
import { mockUseUpdateAvatar } from "mocks/testing/users";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { describe, vi, it, expect } from "vitest";
import { Header } from "./header";
import { systemName } from "./strings";

vi.mock("hooks/assets/useProfileIcons", () => ({
	useProfileIcons: mockUseProfileIcons,
}));
vi.mock("hooks/assets/useUpdateAvatar", () => ({
	useUpdateAvatar: mockUseUpdateAvatar,
}));

describe("header component", () => {
	it("renders header with wave and fixed", () => {
		routerRenderWithTheme(<Header backgroundType="wave" fixed />);
		const imgElement = screen.getByTitle(systemName);
		expect(imgElement).toBeInTheDocument();
	});

	it("renders header with wave and not fixed", () => {
		routerRenderWithTheme(<Header backgroundType="wave" fixed={false} />);
		const imgElement = screen.getByTitle(systemName);
		expect(imgElement).toBeInTheDocument();
	});

	it("renders header without wave and fixed", () => {
		routerRenderWithTheme(<Header backgroundType="transparent" fixed />);
		const imgElement = screen.getByTitle(systemName);
		expect(imgElement).toBeInTheDocument();
	});

	it("renders header without wave and not fixed", () => {
		routerRenderWithTheme(
			<Header backgroundType="transparent" fixed={false} />
		);
		const imgElement = screen.getByTitle(systemName);
		expect(imgElement).toBeInTheDocument();
	});
});
