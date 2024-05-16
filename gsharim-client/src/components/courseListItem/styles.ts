import { Theme } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	margin: "10px",
	maxWidth: "240px",
	minWidth: "230px",
	height: "310px",
	borderRadius: "1rem",
	boxShadow: 1,
	backgroundColor: "white.main",
};
export const imageContainer: SystemStyleObject = {
	transition: "opacity 0.2s",
	display: "flex",
	flexDirection: "column",
	"&:hover": {
		opacity: 0.7,
		cursor: "pointer",
	},
};
export const progressBarContainer: SystemStyleObject = {
	display: "flex",
};
export const learningButton: SxProps<Theme> = {
	alignSelf: "center",
	height: "34px",
};
export const image: SystemStyleObject = {
	width: "230px",
};
export const courseName: SystemStyleObject = {
	color: "primary.main",
	fontWeight: "medium",
	fontSize: "18px",
	margin: "0 16px",
};
export const createdBy: SystemStyleObject = {
	color: "black.main",
	opacity: "0.5",
	fontSize: "12px",
	paddingBottom: "5px",
	margin: "0 16px",
};
export const numberOfHoursText: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	fontWeight: 600,
	fontSize: "12px",
};
export const difficultyText: SystemStyleObject = {
	fontWeight: 600,
	fontSize: "12px",
};
export const generalData: SystemStyleObject = {
	display: "flex",
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: "400",
	fontSize: "12px",
	opacity: 0.6,
	margin: "16px 10px 0 10px",
};
export const data: SystemStyleObject = {
	marginRight: "8px",
	marginLeft: "8px",
};
export const tagsContainer: SystemStyleObject = {
	display: "flex",
	width: "200px",
	height: "25px",
	marginTop: "-40px",
	position: "absolute",
};
export const tag: SystemStyleObject = {
	padding: "0rem 0.5rem 0rem 0.5rem",
	lineHeight: "25px",
	marginRight: "0.6rem",
	backgroundColor: "white.main",
	opacity: 0.9,
	color: "black.main",
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: "400",
	fontSize: "12px",
	borderRadius: "8px",
};
export const ribbon: SystemStyleObject = {
	position: "absolute",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	overflow: "hidden",
	width: "90px",
	height: "90px",
	borderRadius: "1rem",
	zIndex: "container",
	alignSelf: "flex-end",
};
export const ribbonBefore: SystemStyleObject = {
	textShadow: 2,
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: 500,
	fontSize: "14px",
	color: "white.main",
	width: "100px",
	height: "40px",
	textAlign: "center",
	lineHeight: "50px",
};

export const ribbonBeforeTransformLTR: SystemStyleObject = {
	transform: "rotate(45deg) translateY(-40px)",
};

export const ribbonBeforeTransform: SystemStyleObject = {
	transform: "rotate(-45deg) translateY(-40px)",
};

export const tooltipBackground: SystemStyleObject = {
	backgroundColor: "transparent",
	marginRight: "30px",
	marginLeft: "30px",
};
