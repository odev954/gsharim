import { LogPayload, LogTypes } from "hooks/logger/types";

interface CustomLogType<T extends LogTypes> {
	message: T;
	description: string;
	payload?: LogPayload[T];
}

export class CustomLog<T extends LogTypes> implements CustomLogType<T> {
	message: T;

	description = "";

	user: string | undefined;

	language: string;

	payload: LogPayload[T];

	constructor(
		message: T,
		description: string,
		user: string | undefined,
		language: string,
		payload: LogPayload[T]
	) {
		this.message = message;
		this.description = description;
		this.payload = payload;
		this.user = user;
		this.language = language;
	}
}

export const levels = ["info", "warn", "error", "debug", "trace"] as const;
export type logFunctionsType = typeof levels[number];

export type customLogFunctionProps<T extends LogTypes> = [
	message: T,
	description: string,
	user: string | undefined,
	language: string,
	payload: LogPayload[T]
];
export type customLogFunctionType<T extends LogTypes> = (
	...props: customLogFunctionProps<T>
) => void;
export type customLoggerType<T extends LogTypes> = {
	[key in logFunctionsType]: customLogFunctionType<T>;
};
