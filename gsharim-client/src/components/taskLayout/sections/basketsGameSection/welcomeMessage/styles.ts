const titleFontSize = "20px";
const textFontBaseStyles = {
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: "400",
	fontSize: "14px",
	lineHeight: "14px",
	textAlign: "center",
};

export const container = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	marginRight: "4px",
};

export const title = {
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: "600",
	fontSize: titleFontSize,
	lineHeight: "21px",
	textAlign: "center",
	marginBottom: "8px",
};

export const firstLine = textFontBaseStyles;

export const secondLineBold = {
	...textFontBaseStyles,
	fontWeight: "600",
	display: "inline",
};

export const secondLineNotBold = {
	...textFontBaseStyles,
	display: "inline",
};

export const secondLine = {
	marginTop: "-3px",
};

export const thirdLine = {
	...textFontBaseStyles,
	paddingTop: "20px",
};

export const forthLine = {
	display: "flex",
	alignItems: "center",
	marginTop: "10px",
};

export const arrowText = {
	...textFontBaseStyles,
	margin: "0px 8px 0px 8px",
};

export const RightArrowImage = {
	marginLeft: "10px",
};

export const LeftArrowImage = {
	marginRight: "10px",
};
