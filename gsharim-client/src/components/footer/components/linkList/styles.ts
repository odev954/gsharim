import { SystemStyleObject } from "@mui/system";

export const link: SystemStyleObject = {
	color: "blue.main",
	marginRight: "10px",
	marginLeft: "10px",
	"&:hover": {
		opacity: 0.5,
	},
};
export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	alignContent: "center",
	justifyContent: "center",
	flexWrap: "wrap",
};
export const dot: SystemStyleObject = {
	backgroundColor: "#CEDCF9", // this is custom on porpuse
	borderRadius: "10px",
	height: "5px",
	width: "5px",
};
export const dotContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
};
