import {
	Box,
	Button,
	SxProps,
	Theme,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMemo } from "react";
import * as styles from "./styles";
import { additionalButtonsStyles } from "./utils";

interface GalleryButtonsProps {
	moveRight: VoidFunction;
	moveLeft: VoidFunction;
	canRight: boolean;
	canLeft: boolean;
}

export function GalleryButtons({
	moveRight,
	moveLeft,
	canRight,
	canLeft,
}: GalleryButtonsProps): JSX.Element {
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("md"));
	const forwardButtonStyles: SxProps<Theme> = useMemo(
		() => ({ ...styles.button, ...additionalButtonsStyles(canLeft) }),
		[canLeft]
	);
	const backwardsButtonStyles: SxProps<Theme> = useMemo(
		() => ({ ...styles.button, ...additionalButtonsStyles(canRight) }),
		[canRight]
	);
	return (
		<Box sx={mobile ? styles.mobileTopLine : styles.topLine}>
			<Box sx={styles.buttonsContainer}>
				<Button sx={backwardsButtonStyles} onClick={moveRight} disableRipple>
					<ChevronRightIcon />
				</Button>

				<Button sx={forwardButtonStyles} onClick={moveLeft} disableRipple>
					<ChevronLeftIcon />
				</Button>
			</Box>
		</Box>
	);
}
