import { Box } from "@mui/material";
import { validateArrayLength } from "utils/common";
import { container } from "./styles";
import { LayoutProps } from "../types";

export default function SingleSection({ children }: LayoutProps): JSX.Element {
	if (!validateArrayLength(children, 1))
		throw new Error("invalid amount of sections");

	return <Box sx={container}>{children}</Box>;
}
