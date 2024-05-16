import { SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "background.paper",
};
export const logosContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	backgroundColor: "white.dark",
	height: "50px",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
};
export const mobileLogosContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	backgroundColor: "white.dark",
	height: "30px",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
};
export const barContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	paddingBottom: "10px",
	paddingTop: "10px",
	paddingRight: "10px",
	paddingLeft: "10px",
	fontSize: "14px",
	whiteSpace: "nowrap",
	overflow: "hidden",
	backgroundColor: "white.dark",
};
export const mobileBarContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	paddingBottom: "10px",
	fontSize: "14px",
	backgroundColor: "white.dark",
};
export const rightsReserved: SystemStyleObject = {
	color: "black.main",
	justifySelf: "start",
	marginRight: "45px",
};
export const linkList: SystemStyleObject = {};

export const mobileLinkList: SystemStyleObject = {
	paddingTop: "10px",
};
export const phoneNumber: SystemStyleObject = {
	color: "black.main",
};
export const emailAddress: SystemStyleObject = {
	justifySelf: "end",
	color: "blue.main",
	"&:hover": {
		opacity: 0.7,
		cursor: "pointer",
	},
};
export const leftContainer: SystemStyleObject = {
	display: "flex",
	justifyContent: "space-between",
	marginLeft: "45px",
	width: "250px",
};
export const mobileLeftContainer: SystemStyleObject = {
	display: "flex",
	marginTop: "15px",
	width: "330px",
	flexDirection: "row-reverse",
	justifyContent: "space-between",
};
export const waveImage: SystemStyleObject = {
	height: "15vh",
	width: "100%",
	backgroundSize: "cover",
	backgroundColor: "transparent",
};
export const mobileWaveImage: SystemStyleObject = {
	height: "50px",
	width: "100%",
	backgroundSize: "cover",
	backgroundColor: "transparent",
};

export const mobileRightsReserved: SystemStyleObject = {
	color: "black.main",
	marginTop: "15px",
};
