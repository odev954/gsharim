import { CSSProperties } from "react";
import { buildStyles } from "react-circular-progressbar";
import { CircularProgressbarStyles } from "react-circular-progressbar/dist/types";
import { SystemStyleObject } from "@mui/system";

export const lessonIcon: SystemStyleObject = {
	width: "90px",
	height: "90px",
	aspectRatio: 1,
};
export const lessonContainerWithHover: SystemStyleObject = {
	pointerEvents: "auto",
	width: "10rem",
	height: "fit-content",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	padding: 0,
	zIndex: "modal",
};
export const lessonContainerNoHover: SystemStyleObject = {
	pointerEvents: "none",
	width: "150px",
	height: "fit-content",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	padding: 0,
	zIndex: "modal",
};
export const lessonPaperContainerStyle: SystemStyleObject = {
	borderRadius: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: "container",
};
export const progressBarContainerStyle: SystemStyleObject = {
	width: "7rem",
	scrollMarginTop: "300px",
	"& svg": {
		position: "relative",
		zIndex: "subContainer",
	},
};
export const overlayStyle: SystemStyleObject = {
	borderRadius: "100%",
	position: "absolute",
	backgroundColor: "grey.400",
	zIndex: "subContainer",
};
export const lockedIconImage: SystemStyleObject = {
	width: "1.25rem",
	height: "1.25rem",
	objectFit: "contain",
};
export const lockedIconStyle: SystemStyleObject = {
	borderRadius: "100%",
	padding: "10px",
	position: "absolute",
	width: "25px",
	height: "25px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: "modal",
};
export const lessonLabel: SystemStyleObject = {
	borderRadius: "5px",
	fontFamily: "rubik-medium",
	color: "black.main",
	padding: "5px",
	marginTop: "5px",
};

export const progressBarStyle: CircularProgressbarStyles = buildStyles({
	strokeLinecap: "round",
	pathTransitionDuration: 0.5,
	pathColor: `success.300`,
});

export const disabledLink: CSSProperties = { pointerEvents: "none" };
