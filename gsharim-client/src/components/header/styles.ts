import { CSSProperties } from "react";
import { SystemStyleObject } from "@mui/system";

export const headerContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	zIndex: "appBar",
};
export const mobileHeaderContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	zIndex: "appBar",
};
export const headerContainerDown: SystemStyleObject = {
	backgroundColor: "transparent",
	minHeight: "13.2vh",
	backgroundSize: "cover",
	width: "100%",
};

export const headerSolidContainerDown: SystemStyleObject = {
	boxShadow: 1,
	width: "100%",
	backgroundColor: "white.main",
};

export const headerUpAnimation: SystemStyleObject = {
	animation: "headerContainerUp linear 0.3s",
	padding: 0,
	backgroundColor: "transparent",
	"@keyframes headerContainerUp": {
		"0%": {
			opacity: 0,
		},
	},
};

export const headerDownAnimation: SystemStyleObject = {
	animation: "headerContainerDown linear 0.3s",
	padding: 0,
	backgroundColor: "transparent",
	"@keyframes headerContainerDown": {
		"0%": {
			opacity: 0,
		},
	},
};

export const logoAndEnvStatusContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
};

export const mobileLogoAndEnvStatusContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	margin: "0 5px",
};

export const header: SystemStyleObject = {
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	zIndex: "appBar",
	backgroundColor: "transparent",
};

export const leftSideContent: SystemStyleObject = {
	display: "flex",
	padding: "8px",
	alignItems: "center",
	justifyContent: "space-between",
};

export const mobileLeftSideContent: SystemStyleObject = {
	display: "flex",
	padding: "8px",
	alignItems: "center",
	justifyContent: "space-between",
	scale: "0.8",
};

export const logoBox: CSSProperties = {
	height: "24px",
	width: "104px",
	marginTop: "8px",
};

export const mobileLogoBox: CSSProperties = {
	height: "24px",
	width: "87px",
	marginTop: "8px",
};
