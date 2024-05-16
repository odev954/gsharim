import { SystemStyleObject } from "@mui/system";

export const titleContainer: SystemStyleObject = {
	position: "sticky",
	top: 0,
	left: 0,
	right: 0,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: "tooltip",
};

const baseTitleStyles: SystemStyleObject = {
	textAlign: "center",
	backgroundColor: "white.main",
	boxShadow: 2,
	borderRadius: "25px",
	display: "grid",
	gridTemplateColumns: "40px auto 40px",
	alignItems: "center",
};

export const title: SystemStyleObject = {
	...baseTitleStyles,
	minWidth: "580px",
	maxWidth: "fit-content",
	padding: "10px",
	margin: "100px",
};

export const mobileTitle: SystemStyleObject = {
	...baseTitleStyles,
	width: "100%",
	padding: "10px",
	margin: "20px",
	marginTop: "70px",
};

export const chapterTitle: SystemStyleObject = {
	fontFamily: "rubik-medium",
	fontSize: "1.25rem",
	color: "black.main",
};

export const percents: SystemStyleObject = {
	fontSize: "10px",
	color: "black.main",
};
