import { useCallback } from "react";
import { logFunctionsType } from "types/logger/log";
import { Log, LogFunction, LogPayload, LogTypes } from "./types";

export function useLogFunction<T extends LogTypes>(
	logAction: logFunctionsType,
	log: Log<T>
): LogFunction<T> {
	const logFunction = useCallback(
		(message: T, description: string, payload?: LogPayload[T]): void => {
			log(logAction, message, description, payload);
		},
		[log, logAction]
	);
	return logFunction;
}
