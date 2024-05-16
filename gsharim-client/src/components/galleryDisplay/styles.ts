import { SystemStyleObject } from "@mui/system";

export const galleryContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
};
export const topLine: SystemStyleObject = {
	display: "flex",
	flexDirection: "row-reverse",
	marginTop: "-50px",
};

export const mobileTopLine: SystemStyleObject = {
	display: "flex",
	flexDirection: "row-reverse",
	marginTop: "-65px",
};
export const buttonsContainer: SystemStyleObject = {
	display: "flex",
	height: "50px",
	alignItems: "center",
	justifyContent: "center",
	direction: "rtl",
};
export const button: SystemStyleObject = {
	minWidth: "24px",
	minHeight: "24px",
	width: "24px",
	height: "24px",
	backgroundColor: "white.main",
	borderRadius: "8px",
	marginLeft: "10px",
	cursor: "pointer",
	color: "black.main",
	"&:hover": {
		backgroundColor: "white.main",
	},
	paddingTop: "0px",
	paddingBottom: "0px",
};
