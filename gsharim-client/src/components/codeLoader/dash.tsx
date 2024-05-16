import { Box } from "@mui/material";
import * as styles from "./styles";
import { expandAnimation } from "./utils";

interface DashProps {
	expand: number;
	animationDelay?: string;
}

export function Dash({ expand, animationDelay }: DashProps): JSX.Element {
	return (
		<Box sx={[styles.baseDash, expandAnimation(expand), { animationDelay }]} />
	);
}
