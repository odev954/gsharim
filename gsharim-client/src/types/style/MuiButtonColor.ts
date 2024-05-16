import { ButtonPropsColorOverrides } from "@mui/material";

export type MuiButtonColor =
	| keyof ButtonPropsColorOverrides
	| "inherit"
	| "primary"
	| "secondary"
	| "success"
	| "error"
	| "info"
	| "warning";
