import { CircularProgress } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { useProfileIcons } from "hooks/assets/useProfileIcons";
import * as styles from "./styles";
import UserIconComponent from "./userIconComponent";

export interface UserIconProps {
	iconSrc?: string;
}

export function UserIconContainer({ iconSrc }: UserIconProps): JSX.Element {
	const [showIconMenu, setShowIconMenu] = useState(false);
	const anchorEl = useRef<HTMLButtonElement>(null);
	const { isError, isLoading, data: iconsMap } = useProfileIcons();
	const [profileIconSrc, setProfileIconSrc] = useState<string | undefined>(
		iconSrc
	);

	const handleIconsMenuClick = useCallback(
		() => setShowIconMenu(!showIconMenu),
		[showIconMenu]
	);

	useEffect(() => {
		setProfileIconSrc(iconSrc);
	}, [iconSrc]);

	if (isLoading) return <CircularProgress sx={styles.userIconsState} />;
	if (isError) return <ErrorIcon color="error" sx={styles.userIconsState} />;
	return (
		<UserIconComponent
			iconsMap={iconsMap}
			profileIconSrc={profileIconSrc}
			showIconMenu={showIconMenu}
			setShowIconMenu={setShowIconMenu}
			anchorEl={anchorEl}
			handleIconsMenuClick={handleIconsMenuClick}
			setProfileIconSrc={setProfileIconSrc}
		/>
	);
}
