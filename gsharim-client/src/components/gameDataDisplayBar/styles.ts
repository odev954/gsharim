const fontSize = "24px !important"; // must use !important here because mui will add a font size based on the width, and i must use a custome width and custome fontSize.

export const container = {
	display: "flex",
	position: "absolute",
	flexFirection: "row",
	top: 0,
	right: 0,
	width: "100%",
	zIndex: "tooltip",
	color: "white.main",
	font: "Rubik",
	fontWeight: 400,
	justifyContent: "space-between",
	whiteSpace: "nowrap",
};
export const leftSide = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	width: "fit-content",
};
export const middlePart = {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: "gamePart",
	color: "white.main",
	font: "Rubik",
};
export const middlePartText = {
	fontSize,
	userSelect: "none",
};
export const rightSide = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	width: "fit-content",
	marginLeft: "20px",
	marginRight: "20px",
	weight: 500,
	color: "yellow",
	fontSize,
	userSelect: "none",
};
export const livesImage = {
	width: "40px",
	paddingRight: "5px",
	paddingTop: "1px",
	userSelect: "none",
};
export const clockContainer = {
	display: "flex",
	flexDirection: "row",
	width: "165px",
	marginLeft: "25px",
};
export const clockText = {
	fontSize,
	marginLeft: "5px",
	userSelect: "none",
};
export const clockNumbers = {
	fontSize,
	userSelect: "none",
};

export const scoreContainer = {
	display: "flex",
	flexDirection: "row",
	width: "105px",
};
export const scoreText = {
	fontSize,
	marginLeft: "5px",
	userSelect: "none",
};
export const scoreNumbers = {
	fontSize,
	userSelect: "none",
};
