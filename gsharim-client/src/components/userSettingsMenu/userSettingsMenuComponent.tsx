import {
	Button,
	Stack,
	Typography,
	Box,
	CircularProgress,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import UserOptionsArrow from "assets/header/userOptionsArrow.svg";
import { User } from "types/users/user";
import { isNull } from "lodash-es";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import { UserIcon } from "../userIcon";
import { UserMenuPopper } from "../userMenuPopper";
import { useOptionsAltText } from "./strings";

interface UserSettingsMenuProps {
	open: boolean;
	menuPosRef: React.RefObject<HTMLButtonElement>;
	handleMenuClick: () => void;
	user: User | null;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function UserSettingsMenuComponent({
	open,
	menuPosRef,
	handleMenuClick,
	user,
	setOpen,
}: UserSettingsMenuProps): JSX.Element {
	const { t: translate } = useTranslation();
	if (isNull(user)) {
		return (
			<Stack sx={styles.stack}>
				<CircularProgress />
			</Stack>
		);
	}
	return (
		<Stack sx={styles.stack}>
			<UserIcon iconSrc={user.details.avatar.url} />
			<Button
				ref={menuPosRef}
				sx={styles.userInformation}
				aria-expanded={open}
				onClick={handleMenuClick}
			>
				<Typography sx={styles.userName}>{user.details.name}</Typography>
				<Box
					component="img"
					src={UserOptionsArrow}
					alt={translate(useOptionsAltText)}
				/>
			</Button>
			<UserMenuPopper open={open} menuPosRef={menuPosRef} setOpen={setOpen} />
		</Stack>
	);
}
