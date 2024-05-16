import { SystemStyleObject } from "@mui/system";
import { CSSProperties } from "react";

export const landmarkUp: SystemStyleObject = {
	position: "absolute",
	transitionDuration: "1s, 1s",
	transitionDelay: "0s, 0s",
	transitionProperty: "top, opacity",
	opacity: 0,
};
export const landmarkDown: SystemStyleObject = {
	position: "absolute",
	transitionDuration: "1s, 1s",
	transitionDelay: "0s, 0s",
	transitionProperty: "top, opacity",
	opacity: 1,
};
export const landmarkData: SystemStyleObject = {
	height: "20px",
	fontFamily: "Rubik",
	fontSize: "14px",
	fontStyle: "normal",
	fontWeight: 600,
	color: "black.main",
	boxShadow: 2,
	borderRadius: "8px",
	textAlign: "center",
	lineHeight: "15px",
	padding: "3px 9px 3px 9px",
	backgroundColor: "white.main",
	marginBottom: "-10px",
};

export const tooltipBackground: CSSProperties = {
	backgroundColor: "transparent",
};
