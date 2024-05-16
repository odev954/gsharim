import { PopoverOrigin } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	borderRadius: "20px",
	padding: "0 10px",
};
export const wrapper: SystemStyleObject = {
	background: "white",
	borderRadius: "20px",
};
export const anchorOrigin: PopoverOrigin = {
	vertical: "bottom",
	horizontal: "center",
};
export const transformOrigin: PopoverOrigin = {
	vertical: "top",
	horizontal: "center",
};

export const languageInformation: SystemStyleObject = {
	display: "flex",
	color: "black.main",
	height: "100%",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "30px",
};

export const langName: SystemStyleObject = {
	marginRight: "8px",
	marginLeft: "8px",
};
export const startIcon: SystemStyleObject = {
	marginRight: "-4px",
	marginLeft: "8px",
};
export const leftIcon: SystemStyleObject = {
	marginRight: "8px",
	marginLeft: "-4px",
};

export const menuStyles: SystemStyleObject = {
	height: "500px",
	marginTop: "5px",
};

export const item: SystemStyleObject = {
	minWidth: "97px",
	"&:hover": {
		backgroundColor: "white.dark",
	},
	paddingRight: "12px",
};

export const selectedItem: SystemStyleObject = {
	minWidth: "97px",
	color: "secondary.main",
	paddingRight: "12px",
};
