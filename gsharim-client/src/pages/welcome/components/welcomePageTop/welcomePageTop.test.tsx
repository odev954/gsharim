import { describe, vi, it } from "vitest";
import { screen } from "@testing-library/react";
import {
	mockUseCourse,
	mockUseCourseMetadataList,
} from "mocks/testing/courses";
import { authContextMock } from "mocks/testing/users";
import { routerRenderWithTheme } from "utils/tests/renderWithTheme";
import { AuthContext } from "contexts/auth";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loginSubTitle, loginTitle } from "components/loginForm/strings";
import WelcomePageTop from "./welcomePageTop";
import { readyLearningText } from "./strings";

vi.mock("hooks/courses/useCourseMetadtaList", () => ({
	useCourseList: mockUseCourseMetadataList,
}));
vi.mock("hooks/courses/useCourse", () => ({
	useCourse: mockUseCourse,
}));
vi.mock("api/users/updateAvatar", () => ({
	updateAvatar: vi.fn(),
}));

vi.mock("app/prefetchs", () => {
	return {};
});

describe("welcome page top component, unAuthenticated", () => {
	it("renders welcome page top", () => {
		routerRenderWithTheme(
			<AuthContext.Provider value={authContextMock(false)}>
				<HelmetProvider context={{}}>
					<WelcomePageTop />
				</HelmetProvider>
			</AuthContext.Provider>
		);
		screen.getByText(loginTitle + loginSubTitle);
	});
});

describe("welcome page top component, authenticated", () => {
	it("renders welcome page top", () => {
		const queryClient = new QueryClient();

		routerRenderWithTheme(
			<QueryClientProvider client={queryClient}>
				<AuthContext.Provider value={authContextMock(true)}>
					<WelcomePageTop />
				</AuthContext.Provider>
			</QueryClientProvider>
		);
		screen.getByText(readyLearningText);
	});
});
