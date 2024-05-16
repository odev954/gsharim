import { useAuth } from "hooks/users/useAuth";
import { AuthContext } from "contexts/auth";

type AuthProviderComponentProps = {
	children: JSX.Element[];
};

export function AuthProviderComponent({
	children,
}: AuthProviderComponentProps): JSX.Element {
	const authObject = useAuth();

	return (
		<AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
	);
}
