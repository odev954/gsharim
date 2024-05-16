import { SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
	position: "absolute",
	top: "15px",
	right: "15px",
	zIndex: "container",
};
export const questionMark: SystemStyleObject = {
	color: "text.light",
};
export const exitButton: SystemStyleObject = {
	position: "absolute",
	color: "text.light",
	zIndex: "container",
};
export const header: SystemStyleObject = {
	marginTop: "10px",
	textAlign: "center",
	fontSize: "14px",
	color: "monochromatic.main",
};
export const line: SystemStyleObject = {
	position: "relative",
	fontSize: "12px",
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
};
export const funcitonName: SystemStyleObject = {
	marginLeft: "5px",
	color: "#8EA8FF",
	textDecoration: "underline",
};
export const functionDescription: SystemStyleObject = {
	color: "monochromatic.main",
	marginLeft: "20px",
};
export const text: SystemStyleObject = {
	backgroundColor: "rgba(0,0,0, 0.8)",
	borderRadius: "20px",
	padding: "10px",
	overflowY: "auto",
	maxHeight: "300px",
};
export const typography: SystemStyleObject = {
	lineHeight: 2,
};
