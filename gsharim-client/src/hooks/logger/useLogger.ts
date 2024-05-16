import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "contexts/auth";
import { consoleLogger, remoteLogger } from "utils/logger";
import { logFunctionsType } from "types/logger/log";
import { useTranslation } from "react-i18next";
import { LogFunction, LogPayload, LogTypes } from "./types";
import { useLogFunction } from "./useLogFunction";

type UseLoggerResult<T extends LogTypes> = {
	[key in logFunctionsType]: LogFunction<T>;
};

export function useLogger<T extends LogTypes>(): UseLoggerResult<T> {
	const { user } = useContext(AuthContext);
	const { i18n } = useTranslation();
	const log = useCallback(
		(
			logAction: logFunctionsType,
			message: LogTypes,
			description: string,
			payload?: LogPayload[LogTypes]
		): void => {
			if (import.meta.env.DEV) {
				consoleLogger[logAction](
					message,
					description,
					user?.details.name,
					i18n.language,
					payload
				);
			}
			remoteLogger[logAction](
				message,
				description,
				user?.details.name,
				i18n.language,
				payload
			);
		},
		[user?.details.name, i18n]
	);

	const debug = useLogFunction("debug", log);
	const error = useLogFunction("error", log);
	const info = useLogFunction("info", log);
	const trace = useLogFunction("trace", log);
	const warn = useLogFunction("warn", log);

	const logger = useMemo(
		() => ({ debug, error, info, trace, warn }),
		[debug, error, info, trace, warn]
	);

	return logger;
}
