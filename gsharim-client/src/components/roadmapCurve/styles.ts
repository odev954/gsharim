import { SystemStyleObject } from "@mui/system";

export const mainContainer: SystemStyleObject = {
	height: "240px",
	flexGrow: "1",
	flexShrink: "1",
};
export const mainContainerLeft: SystemStyleObject = {
	marginBlockEnd: "-26.5px",
	paddingRight: `85px`,
};
export const curveImageContainerLeft: SystemStyleObject = {
	width: "100%",
	margin: 0,
	display: "flex",
	justifyContent: "flex-end",
};
export const mainContainerRight: SystemStyleObject = {
	marginBlockEnd: "-31.5px",
	paddingLeft: `85px`,
};
export const curveImageContainerRight: SystemStyleObject = {
	width: "100%",
	margin: 0,
	display: "flex",
	justifyContent: "flex-start",
};
export const curveImageRight: SystemStyleObject = {
	transform: "rotate(180deg)",
};
export const secondaryContainer: SystemStyleObject = {
	height: "100%",
};
export const curveImage: SystemStyleObject = {
	height: "240px",
	flexGrow: "1",
	flexShrink: "1",
	zIndex: "container",
	margin: 0,
};
export const childContainer: SystemStyleObject = {
	position: "relative",
	zIndex: "subContainer",
};
