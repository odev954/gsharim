import { customLogJSON } from "./loggerUtils";

export const remoteLoggerOptions = {
	url: "/logger",
	method: "POST",
	headers: {},
	stacktrace: {
		levels: ["trace", "warn", "error"],
		depth: 10,
		excess: 0,
	},
	timestamp: () => new Date(),
	format: customLogJSON,
};
