import { SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "50px",
	padding: "0 16px 0 16px",
	backgroundColor: "white.main",
	borderRadius: "30px",
	flexDirection: "row-reverse",
	boxShadow: 5,
	direction: "rtl",
	zIndex: "stepper",
};

export const stepperWrapper: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
};

export const rtlStepper: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
};
export const ltrStepper: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
	flexDirection: "row-reverse",
};
export const block: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
	height: "50px",
	width: "100%",
	justifyContent: "center",
};

export const step: SystemStyleObject = {
	height: "20px",
	width: "20px",
	padding: "3px 3px 4px 5px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export const icon: SystemStyleObject = {
	height: "20px",
	width: "20px",
	fontSize: "50px",
};

export const stepContainer: SystemStyleObject = {
	height: "20px",
	width: "20px",
	borderRadius: "50%",
	backgroundColor: "white.main",
	border: "1px solid",
	borderColor: "secondary.main",
	textAlign: "center",
	zIndex: "stepper",
};

export const notActiveContainer: SystemStyleObject = {
	scale: "1",
	borderColor: "monochromatic.main",
};

export const activeContainer: SystemStyleObject = {
	scale: "1.5",
};

export const ltrStepConnector: SystemStyleObject = {
	height: "2px",
	width: "20px",
	backgroundColor: "monochromatic.main",
	position: "absolute",
	top: "9px",
	right: "calc(50% + 7px)",
	left: "calc(-50% + 7px)",
};
export const rtlStepConnector: SystemStyleObject = {
	height: "2px",
	width: "20px",
	backgroundColor: "monochromatic.main",
	position: "absolute",
	top: "9px",
	left: "calc(50% + 20px)",
	right: "calc(-50% + 7px)",
};
