import { SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	height: "100%",
	width: "100%",
	position: "absolute",
	background: "white",
};

export const displayWrapper: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
};

export const contentWrapper: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	width: "100%",
};

export const secondaryLayoutTitlesContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	width: "800px",
	background: "transparent",
	fontFamily: "Rubik",
	fontWeight: 500,
	alignSelf: "flex-end",
	marginLeft: "4px",
};

export const primaryLayoutTitlesContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	height: "200px",
	width: "700px",
	alignItems: "center",
	background: "transparent",
	fontFamily: "Rubik",
	color: "white.main",
	fontWeight: 500,
};

export const mainTitle: SystemStyleObject = {
	fontSize: "30px",
	marginBottom: "10px",
	color: "secondary.main",
};

export const subTitle: SystemStyleObject = {
	fontSize: "24px",
	opacity: "0.8",
	color: "black.dark",
	marginBottom: "40px",
};

export const subSubtitle: SystemStyleObject = {
	fontSize: "18px",
	opacity: "0.5",
	marginBottom: "32px",
	color: "black.main",
};

export const startButton: SystemStyleObject = {
	height: "40px",
	width: "190px",
	backgroundColor: "secondary.main",
	color: "white.main",
	"&:hover": {
		backgroundColor: "secondary.main",
	},
	marginBottom: "150px",
};

export const bar: SystemStyleObject = {
	height: "3px",
	borderRadius: "5px",
	backgroundColor: "secondary.main",
	color: "secondary.main",
};
