const lineStyle = {
	margin: "2px",
	width: "fit-content",
	padding: "4px 8px 4px 8px",
	marginLeft: "5px",
	boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
};

export const container = {
	display: "flex",
	flexDirection: "column",
	flexBasis: "100%",
	padding: "4px",
	overflowY: "auto",
	whiteSpace: "pre-line",
	backgroundColor: "background.default",
	direction: "ltr",
};
export const outputLine = {
	...lineStyle,
	backgroundColor: "background.paper",
	borderRadius: "0px 8px 8px 0px",
};
export const inputLine = {
	...lineStyle,
	backgroundColor: "#2F80ED",
	color: "text.light",
	alignSelf: "flex-end",
	borderRadius: "8px 0px 0px 8px",
};
export const errorLine = {
	...lineStyle,
	backgroundColor: "background.paper",
	color: "error.main",
	borderRadius: "0px 8px 8px 0px",
};
