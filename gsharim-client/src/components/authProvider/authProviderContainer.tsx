import { Auth0Provider, AuthProviderOptions } from "hooks/users/useAuth";
import { AuthProviderComponent } from "./authProviderComponent";

type AuthProviderContainerProps = {
	children: JSX.Element[];
};

export function AuthProviderContainer(
	props: AuthProviderContainerProps
): JSX.Element {
	const providerConfig: AuthProviderOptions = {
		domain: import.meta.env.VITE_AUTH0_DOMAIN || "",
		clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "",
		redirectUri: window.location.origin,
		cacheLocation: "localstorage",
	};

	return (
		<Auth0Provider {...providerConfig}>
			<AuthProviderComponent>{props.children}</AuthProviderComponent>
		</Auth0Provider>
	);
}
