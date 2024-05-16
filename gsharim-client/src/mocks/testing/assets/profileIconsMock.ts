import BlueIcon from "assets/header/headerMonsterIcons/blueIcon.svg";
import BeigeIcon from "assets/header/headerMonsterIcons/beigeIcon.svg";
import GreenIcon from "assets/header/headerMonsterIcons/greenIcon.svg";
import OrangeIcon from "assets/header/headerMonsterIcons/orangeIcon.svg";
import PinkIcon from "assets/header/headerMonsterIcons/pinkIcon.svg";
import PurpleIcon from "assets/header/headerMonsterIcons/purpleIcon.svg";
import { AvailableAvatars } from "@eco8200/data-models";

export const mockAvailableIcons = (): AvailableAvatars => {
	return {
		avatars: {
			"1234-dfss-r523-234d": { url: BlueIcon },
			"1434-dass-342f-asw2": { url: OrangeIcon },
			"123w-dfas-as2w-23fa": { url: PinkIcon },
			"1234-dahs-r573-234d": { url: PurpleIcon },
			"1234-52hs-r523-23ad": { url: GreenIcon },
			"1234-dfss-ra23-23xd": { url: BeigeIcon },
		},
	};
};
