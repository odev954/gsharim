import { SystemStyleObject } from "@mui/system";

export const progressContainer: SystemStyleObject = {
	display: "flex",
	alignItems: "flex-start",
	position: "relative",
	flexDirection: "column",
	margin: "0 16px 16px 16px",
};
export const progress: SystemStyleObject = {
	width: "190px",
	height: "4px",
	overflow: "hidden",
	borderRadius: "4px",
	display: "flex",
	backgroundColor: "monochromatic.200",
};

export const progressBar: SystemStyleObject = {
	height: "4px",
	borderRadius: "4px",
};
export const progressInfo: SystemStyleObject = {
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: "400",
	fontSize: "12px",
};
