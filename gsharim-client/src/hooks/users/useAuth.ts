import { useEffect, useMemo } from "react";
import {
	Auth0Provider,
	Auth0ProviderOptions,
	useAuth0,
} from "@auth0/auth0-react";
import { User } from "types/users/user";
import Auth from "types/users/auth";
import { useLogger } from "hooks/logger";
import { useUserDetails } from "./useUserDetails";
import { isUser } from "./utils";

export type AuthProviderOptions = Auth0ProviderOptions;

function useAuth(): Auth {
	const {
		user: auth0user,
		logout,
		loginWithRedirect,
		isAuthenticated,
		isLoading,
	} = useAuth0();
	const { data: userDetails } = useUserDetails(auth0user?.email);
	const logger = useLogger();

	const user = useMemo<User | null>(() => {
		const newUser = { ...auth0user, details: userDetails };

		if (isUser(newUser)) {
			return newUser;
		}
		return null;
	}, [auth0user, userDetails]);

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			logger.info("user-logged-in", "the user logged in");
		}
	}, [isAuthenticated, isLoading, logger]);

	return { user, logout, loginWithRedirect, isAuthenticated, isLoading };
}

export { useAuth, Auth0Provider };
