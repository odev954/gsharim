import { PopoverOrigin } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const alert: SystemStyleObject = {
	width: "100%",
	direction: "ltr",
};
export const menuStyle: SystemStyleObject = {
	"& .MuiMenu-list": {
		display: "flex",
		padding: "0",
		flexWrap: "wrap",
	},
};
export const anchorOrigin: PopoverOrigin = {
	vertical: "bottom",
	horizontal: "center",
};
export const transformOrigin: PopoverOrigin = {
	vertical: "top",
	horizontal: "center",
};
