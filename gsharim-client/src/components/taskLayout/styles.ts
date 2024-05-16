import { SystemStyleObject } from "@mui/system";

export const taskLayoutContainer: SystemStyleObject = {
	height: "100%",
	width: "100%",
	overflow: "hidden",
};

export const layoutContainer: SystemStyleObject = {
	display: "flex",
	position: "relative",
	flexDirection: "column",
	height: "100%",
	width: "100%",
	overflowY: "auto",
};

export const taskWrapper: SystemStyleObject = {
	display: "flex",
	height: "100%",
};

export const questionnairSectionWrapper: SystemStyleObject = {
	display: "flex",
	height: "100%",
	width: "100%",
	maxHeight: "60vh",
	maxWidth: "60vw",
	minWidth: "fit-content",
	padding: "16px",
	margin: "0 auto",
};

export const taskFooterContainer: SystemStyleObject = {
	flexGrow: "1",
};
