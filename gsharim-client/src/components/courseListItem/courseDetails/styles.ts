import { SystemStyleObject } from "@mui/system";

export const globalContainer: SystemStyleObject = {
	display: "flex",
	padding: 1,
	flexDirection: "column",
	justifyContent: "space-between",
	width: "300px",
	maxHeight: "385px",
	backgroundColor: "white.main",
	boxShadow: 1,
	borderRadius: "13px",
	color: "black.main",
	zIndex: "tooltip",
	position: "relative",
};
export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
};
export const header: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "17px",
	fontWeight: 700,
};
export const property: SystemStyleObject = {
	wordSpacing: "2px",
	margin: "0 16px 8px 16px",
};
export const tagsContainer: SystemStyleObject = {
	display: "flex",
};
export const tagChip: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "14px",
	fontWeight: 500,
	backgroundColor: "monochromatic.main",
	borderRadius: "8px",
	marginLeft: "0.5rem",
	color: "text.primary",
	opacity: 0.6,
	height: "25px",
	width: "60px",
	textAlign: "center",
};
export const smallTitle: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "12px",
	fontWeight: 400,
	color: "black.main",
	opacity: 0.6,
};
export const boldTitle: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "14px",
	fontWeight: 700,
};
export const text: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "12px",
	fontWeight: 500,
};
export const skillsContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
};
