import { getAvatar } from "components/iconMenuItem/utils";
import { Avatar } from "@eco8200/data-models";
import { useCallback } from "react";
import IconMenuItemComponent from "./iconMenuItemComponent";

export interface IconMenuItemProps {
	setProfileIconSrc: (src: string) => void;
	iconSrc: string;
	handleChoose: (avatar: Avatar) => void;
}

export function IconMenuItemContainer({
	setProfileIconSrc,
	iconSrc,
	handleChoose,
}: IconMenuItemProps): JSX.Element {
	const onItemClick = useCallback<React.MouseEventHandler<HTMLLIElement>>(
		(e) => {
			handleChoose(getAvatar(e));
			setProfileIconSrc(iconSrc);
		},
		[handleChoose, setProfileIconSrc, iconSrc]
	);

	return <IconMenuItemComponent onItemClick={onItemClick} iconSrc={iconSrc} />;
}
