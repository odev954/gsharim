import { LogoutOptions, RedirectLoginOptions } from "@auth0/auth0-react";
import { User } from "./user";

export default interface Auth {
	user: User | null;
	logout: (options?: LogoutOptions | undefined) => void;
	loginWithRedirect: (
		options?: RedirectLoginOptions | undefined
	) => Promise<void>;
	isAuthenticated: boolean;
	isLoading: boolean;
}
