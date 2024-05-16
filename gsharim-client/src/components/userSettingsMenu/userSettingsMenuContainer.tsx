import { Button } from "@mui/material";
import { useCallback, useContext, useRef, useState } from "react";
import Text from "components/text";
import { AuthContext } from "../../contexts/auth";
import { UserSettingsMenuComponent } from "./userSettingsMenuComponent";
import { loginButtonText } from "./strings";

export function UserSettingsMenuContainer(): JSX.Element {
	const [open, setOpen] = useState(false);
	const menuPosRef = useRef<HTMLButtonElement>(null);
	const { user, isAuthenticated, loginWithRedirect } = useContext(AuthContext);
	const handleMenuClick = useCallback(() => {
		setOpen((current) => !current);
	}, []);

	if (isAuthenticated) {
		return (
			<UserSettingsMenuComponent
				open={open}
				menuPosRef={menuPosRef}
				handleMenuClick={handleMenuClick}
				user={user}
				setOpen={setOpen}
			/>
		);
	}
	return (
		<Button color="blue" onClick={loginWithRedirect}>
			<Text textToTranslate={loginButtonText} />
		</Button>
	);
}
