import {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
} from "react";
import { AuthContext } from "contexts/auth";
import { useLogger } from "hooks/logger";
import { esc, space, tab } from "./consts";
import UserMenuPopperComponent from "./userMenuPopperComponent";

export interface UserMenuPopperContainerProps {
	open: boolean;
	menuPosRef: React.RefObject<HTMLButtonElement>;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function UserMenuPopperContainer({
	open,
	menuPosRef,
	setOpen,
}: UserMenuPopperContainerProps): JSX.Element {
	const triggeringKeystrokes = useMemo(() => [tab, space, esc], []);
	const { logout } = useContext(AuthContext);
	const logger = useLogger();

	const handleLogout = useCallback(() => {
		logger.info("clicked-on-logout", "user logged out");
		logout({ returnTo: window.location.origin });
	}, [logout, logger]);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const handleListKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (triggeringKeystrokes.includes(event.key)) {
				event.preventDefault();
				setOpen(false);
			}
		},
		[setOpen, triggeringKeystrokes]
	);

	return (
		<UserMenuPopperComponent
			open={open}
			menuPosRef={menuPosRef}
			setOpen={setOpen}
			handleClose={handleClose}
			handleListKeyDown={handleListKeyDown}
			handleLogout={handleLogout}
		/>
	);
}
