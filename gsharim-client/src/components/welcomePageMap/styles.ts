import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const title: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "28px",
	fontStyle: "normal",
	fontWeight: 600,
	color: "secondary.main",
	width: "350px",
	borderBottom: "2px solid",
	borderColor: "secondary.main",
	margin: "0 40px",
	whiteSpace: "pre-line",
};
export const mobileTitle: SystemStyleObject = {
	fontSize: "30px",
	color: "secondary.main",
	width: "325px",
	borderBottom: "2px solid",
	borderColor: "secondary.main",
	marginRight: "2rem",
	marginTop: "1rem",
	alignSelf: "center",
};
export const mobileMapContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	marginTop: "50px",
};
export const mobileTextWrapper: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	marginTop: "30px",
	zIndex: "container",
};

export const mapTitleWrapper = {
	width: "100%",
	display: "flex",
	justifyContent: (theme: Theme): string =>
		theme.direction === "ltr" ? "flex-end" : "flex-start",
	alignItems: "center",
	paddingRight: "90px",
	margin: "0 0 -270px 0",
};

export const lineWrapper: SystemStyleObject = {
	margin: "160px -50px 0 -50px",
};
export const mobileLineWrapper: SystemStyleObject = {
	margin: "0",
	alignSelf: "flex-end",
};
export const firstLine: SystemStyleObject = {
	fontSize: "28px",
	color: "black.main",
	height: "62px",
};
export const secondLine: SystemStyleObject = {
	fontSize: "64px",
	color: "secondary.main",
	height: "50px",
	lineHeight: "10px",
};
export const mobileFirstLine: SystemStyleObject = {
	fontSize: "28px",
	color: "black.main",
};
export const mobileSecondLine: SystemStyleObject = {
	fontSize: "50px",
	color: "secondary.main",
	height: "50px",
	lineHeight: "40px",
};
export const mapContainer: SystemStyleObject = {
	position: "relative",
	width: "80%",
};
export const image: SystemStyleObject = {
	width: "100%",
};
export const contentWrapper: SystemStyleObject = {
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: 600,
};
export const mobileContentWrapper: SystemStyleObject = {
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};
