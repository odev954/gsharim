import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import Text from "components/text";
import { logout, myAccount, profile, ariaLabel } from "./strings";
import * as styles from "./styles";
import { UserMenuPopperContainerProps } from "./userMenuPopperContainer";

interface UserMenuPopperComponentProps extends UserMenuPopperContainerProps {
	handleLogout: () => void;
	handleClose: (event: Event | React.SyntheticEvent) => void;
	handleListKeyDown: (event: React.KeyboardEvent) => void;
}

function UserMenuPopperComponent({
	open,
	menuPosRef,
	handleClose,
	handleListKeyDown,
	handleLogout,
}: UserMenuPopperComponentProps): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<Menu
			open={open}
			autoFocus
			anchorEl={menuPosRef.current}
			variant="menu"
			aria-labelledby={translate(ariaLabel)}
			anchorOrigin={styles.anchorOrigin}
			transformOrigin={styles.transformOrigin}
			onKeyDown={handleListKeyDown}
			onClose={handleClose}
		>
			<MenuItem disabled onClick={handleClose}>
				<Text textToTranslate={profile} />
			</MenuItem>
			<MenuItem disabled onClick={handleClose}>
				<Text textToTranslate={myAccount} />
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				<Text textToTranslate={logout} />
			</MenuItem>
		</Menu>
	);
}

export default UserMenuPopperComponent;
