import { Button, Box } from "@mui/material";
import { AvailableAvatars } from "@eco8200/data-models";
import { AccountCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { profileIconAlt } from "./strings";
import * as styles from "./styles";
import { UserIconsMenu } from "../userIconsMenu";

interface UserIconComponentProps {
	showIconMenu: boolean;
	setShowIconMenu: (show: boolean) => void;
	anchorEl: React.RefObject<HTMLButtonElement>;
	handleIconsMenuClick: () => void;
	setProfileIconSrc: (src: string) => void;
	profileIconSrc?: string;
	iconsMap?: AvailableAvatars;
}

function UserIconComponent({
	iconsMap,
	profileIconSrc,
	showIconMenu,
	setShowIconMenu,
	anchorEl,
	handleIconsMenuClick,
	setProfileIconSrc,
}: UserIconComponentProps): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<Box sx={styles.userIconContainer}>
			<Button
				sx={styles.iconMenuButton}
				onClick={handleIconsMenuClick}
				ref={anchorEl}
			>
				{profileIconSrc ? (
					<Box
						component="img"
						sx={styles.profileIcon}
						src={profileIconSrc}
						alt={translate(profileIconAlt)}
					/>
				) : (
					<AccountCircle />
				)}
			</Button>
			<UserIconsMenu
				anchorEl={anchorEl}
				showIconMenu={showIconMenu}
				setShowIconMenu={setShowIconMenu}
				handleIconsMenuClick={handleIconsMenuClick}
				iconsMap={iconsMap}
				setProfileIconSrc={setProfileIconSrc}
			/>
		</Box>
	);
}

export default UserIconComponent;
