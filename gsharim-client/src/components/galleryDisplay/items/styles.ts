import { SystemStyleObject } from "@mui/system";

export const itemsWrapper: SystemStyleObject = {
	display: "flex",
	overflow: "hidden",
};
export const itemsContainer: SystemStyleObject = {
	display: "flex",
	position: "relative",
	userSelect: "none",
};
export const noItemsDisplayed: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "calc(100vw - 150px)",
	margin: "10px",
	height: "150px",
	fontFamily: "Rubik",
	letterSpacing: 0,
	textAlign: "center",
};
export const textWrapper: SystemStyleObject = {
	width: "330px",
	padding: "auto",
	fontFamily: "Rubik",
	letterSpacing: 0,
	textAlign: "center",
	opacity: "1",
	fontSize: "16px",
	fontWeight: "600",
	lineHeight: "23px",
	color: "text.primary",
};
