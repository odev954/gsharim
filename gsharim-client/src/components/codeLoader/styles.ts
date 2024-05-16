const scrollAnimation = {
	"@keyframes scroll": {
		"0%": {
			top: "0px",
		},
		"100%": {
			top: "-185px",
		},
	},
};
export const loaderContainer = {
	height: "175px",
	overflow: "hidden",
	direction: "ltr",
};

export const line = {
	marginTop: "5px",
};

export const groupOne = {
	animation: "scroll 1s linear infinite",
	animationDelay: "1s",
	position: "relative",
	...scrollAnimation,
};
export const groupTwo = {
	animation: "scroll 1s linear infinite",
	animationDelay: "1s",
	position: "relative",
	...scrollAnimation,
};

export const baseDash = {
	height: "12px",
	display: "inline-block",
	borderRadius: "10px",
	background: "black",
};

export const dashOne = {
	background: "black",
};

export const oneTab = {
	marginLeft: "45px",
};
export const twoTabs = {
	marginLeft: "85px",
};
export const noTabs = {
	marginLeft: "5px",
};
