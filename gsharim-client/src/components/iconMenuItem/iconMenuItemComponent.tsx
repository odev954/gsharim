import { MenuItem, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { profileIconOptionAlt } from "./strings";
import * as styles from "./styles";

interface IconMenuItemComponentProps {
	iconSrc: string | undefined;
	onItemClick: React.MouseEventHandler<HTMLLIElement>;
}

function IconMenuItemComponent({
	iconSrc,
	onItemClick,
}: IconMenuItemComponentProps): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<MenuItem onClick={onItemClick} sx={styles.menuItemStyle}>
			<Box
				component="img"
				sx={styles.profileIconOption}
				src={iconSrc}
				alt={translate(profileIconOptionAlt)}
			/>
		</MenuItem>
	);
}

export default IconMenuItemComponent;
