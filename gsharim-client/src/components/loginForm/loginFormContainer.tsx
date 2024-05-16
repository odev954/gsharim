import React, { useCallback, useContext } from "react";
import { AuthContext } from "contexts/auth";
import { LoginFormComponent } from "./loginFormComponent";

export function LoginFormContainer(): JSX.Element {
	const { loginWithRedirect } = useContext(AuthContext);

	const handleLogin = useCallback(() => {
		loginWithRedirect();
	}, [loginWithRedirect]);
	return <LoginFormComponent handleLogin={handleLogin} />;
}
