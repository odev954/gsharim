import Auth from "types/users/auth";
import { mockAuthContext } from "./authMock";

export const authContextMock = (isAuthenticated: boolean): Auth => {
	return mockAuthContext(isAuthenticated);
};

export { mockUseUpdateAvatar } from "./mockUseUpdateAvatar";
