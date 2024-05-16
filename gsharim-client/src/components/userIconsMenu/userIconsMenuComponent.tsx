import { Alert, Box, Menu, Snackbar } from "@mui/material";
import { Avatar } from "@eco8200/data-models";
import { MutationStatus } from "@tanstack/react-query";
import Text from "components/text";
import { IconMenuItem } from "../iconMenuItem";
import * as styles from "./styles";
import { anchorOrigin, snackbarDuration, variants } from "./consts";
import { messages } from "./strings";

interface UserIconsMenuComponentProps {
	anchorEl: React.RefObject<HTMLButtonElement>;
	showIconMenu: boolean;
	handleIconsMenuClick: () => void;
	iconsArray: [string, Avatar][];
	setProfileIconSrc: (src: string) => void;
	handleChoose: (avatar: Avatar) => void;
	showToast: boolean;
	closeToast: () => void;
	status: MutationStatus;
}

function UserIconsMenuComponent({
	anchorEl,
	showIconMenu,
	handleIconsMenuClick,
	iconsArray,
	setProfileIconSrc,
	handleChoose,
	showToast,
	closeToast,
	status,
}: UserIconsMenuComponentProps): JSX.Element {
	return (
		<Box>
			<Snackbar
				anchorOrigin={anchorOrigin}
				open={showToast}
				onClose={closeToast}
				autoHideDuration={snackbarDuration}
			>
				<Alert severity={variants[status]} sx={styles.alert}>
					<Text textToTranslate={messages[status]} />
				</Alert>
			</Snackbar>
			<Menu
				sx={styles.menuStyle}
				anchorEl={anchorEl.current}
				anchorOrigin={styles.anchorOrigin}
				transformOrigin={styles.transformOrigin}
				open={showIconMenu}
				onClose={handleIconsMenuClick}
			>
				{iconsArray?.map(([id, avatar]: [string, Avatar]) => (
					<IconMenuItem
						key={id}
						handleChoose={handleChoose}
						setProfileIconSrc={setProfileIconSrc}
						iconSrc={avatar.url}
					/>
				))}
			</Menu>
		</Box>
	);
}

export default UserIconsMenuComponent;
