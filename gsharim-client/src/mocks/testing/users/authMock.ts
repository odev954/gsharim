import { vi } from "vitest";
import Auth from "types/users/auth";
import { User } from "types/users/user";
import { userDetailsMock } from "./userDetailsMock";

// mock user info
const user: User = {
	details: userDetailsMock(),
};

// value returned for useAuth0 when logged-in
const mockUseAuthLoggedIn: Auth = {
	isAuthenticated: true,
	isLoading: false,
	user,
	logout: vi.fn(),
	loginWithRedirect: vi.fn(),
};

// value returned for useAuth0 when logged-out
const mockUseAuthLoggedOut: Auth = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
	logout: vi.fn(),
	loginWithRedirect: vi.fn(),
};

// mock useAuth0 function that return logged-in or logged-out values
const mockAuthContext = (status: boolean): Auth => {
	return status ? mockUseAuthLoggedIn : mockUseAuthLoggedOut;
};

export { mockAuthContext };
