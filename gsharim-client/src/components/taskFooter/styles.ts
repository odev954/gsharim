import { SystemStyleObject } from "@mui/system";
import { CSSProperties } from "react";

export const footerContainer: SystemStyleObject = {
	display: "flex",
	padding: "10px",
	minHeight: "50px",
	justifyContent: "space-between",
};

const baseArrowContainer: CSSProperties = {
	margin: "4px -8px 0 8px",
};

export const rtlPreviousArrowContainer: CSSProperties = {
	...baseArrowContainer,
	transform: "scaleX(-1)",
	marginRight: "-4px",
	marginLeft: "8px",
	marginTop: "4px",
};

export const ltrPreviousArrowContainer: CSSProperties = {
	...rtlPreviousArrowContainer,
	marginTop: "4px",
	transform: "scaleX(1)",
};

export const rtlNextArrowContainer: CSSProperties = {
	...baseArrowContainer,
	marginRight: "8px",
	marginLeft: "-4px",
	marginTop: "4px",
};

export const ltrNextArrowContainer: CSSProperties = {
	...rtlNextArrowContainer,
	transform: "scaleX(-1)",
	marginTop: "4px",
};
