import { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, AvailableAvatars } from "@eco8200/data-models";
import { useUpdateAvatar } from "hooks/assets/useUpdateAvatar";
import { useLogger } from "hooks/logger";
import UserIconsMenuComponent from "./userIconsMenuComponent";
import { errorCode } from "./consts";

interface UserIconsMenuContainerProps {
	anchorEl: React.RefObject<HTMLButtonElement>;
	showIconMenu: boolean;
	handleIconsMenuClick: () => void;
	setShowIconMenu: (show: boolean) => void;
	setProfileIconSrc: (src: string) => void;
	iconsMap?: AvailableAvatars;
}

export function UserIconsMenuContainer({
	anchorEl,
	showIconMenu,
	handleIconsMenuClick,
	iconsMap,
	setShowIconMenu,
	setProfileIconSrc,
}: UserIconsMenuContainerProps): JSX.Element {
	const [showToast, setShowToast] = useState(false);
	const { mutate: updateAvatar, status } = useUpdateAvatar();
	const logger = useLogger();
	const iconsArray = useMemo(
		() => (iconsMap ? Array.from(Object.entries(iconsMap.avatars)) : []),
		[iconsMap]
	);

	useEffect(() => {
		if (status === errorCode) {
			setShowToast(true);
		}
	}, [status]);

	const closeToast = useCallback((): void => setShowToast(false), []);

	const handleChoose = useCallback(
		(avatar: Avatar) => {
			updateAvatar({ avatar });
			setShowIconMenu(false);
			logger.info("avatar-changed", "user changed avatar", { avatar });
		},
		[updateAvatar, setShowIconMenu, logger]
	);

	return (
		<UserIconsMenuComponent
			anchorEl={anchorEl}
			showIconMenu={showIconMenu}
			handleIconsMenuClick={handleIconsMenuClick}
			iconsArray={iconsArray}
			setProfileIconSrc={setProfileIconSrc}
			handleChoose={handleChoose}
			showToast={showToast}
			closeToast={closeToast}
			status={status}
		/>
	);
}
