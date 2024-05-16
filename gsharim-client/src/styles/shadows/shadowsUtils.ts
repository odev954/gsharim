import { Shadows } from "@mui/material";

export const initialShadows = (): Shadows => {
	const shadows: Shadows = Array(22).fill("none") as Shadows;
	shadows[1] = "0px 0px 6px #C8D4EC";
	shadows[2] = "0px 0px 6px rgba(0, 0, 0, 0.25)";
	shadows[3] = "0px 0px 3px rgba(35, 63, 85, 0.2)";
	shadows[5] = "0px 2px 10px -2px rgba(28, 16, 32, 0.1)";
	return shadows;
};
