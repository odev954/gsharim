import { AlertColor, SnackbarOrigin } from "@mui/material";

export const variants: { [key: string]: AlertColor } = {
	error: "error",
};
export const anchorOrigin: SnackbarOrigin = {
	vertical: "bottom",
	horizontal: "right",
};
export const snackbarDuration = 2000;
export const errorCode = "error";
