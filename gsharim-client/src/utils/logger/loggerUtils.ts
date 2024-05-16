import logConfig, { LogLevelNames, LogLevelNumbers } from "loglevel";
import { LogPayload, LogTypes } from "hooks/logger";
import {
	customLogFunctionProps,
	customLogFunctionType,
	CustomLog,
	levels,
} from "../../types/logger/log";

type PluginRemoteLogType<T extends LogTypes> = {
	message: string;
	level: { label: LogLevelNames; value: LogLevelNumbers };
	timestamp: Date;
	description: string;
	payload: LogPayload[T];
	language: string;
	user: string;
};

const customLogJSON = <T extends LogTypes>(
	log: PluginRemoteLogType<T>
): PluginRemoteLogType<T> => {
	const { message, description, payload, user, language } = JSON.parse(
		log.message
	);
	return {
		message,
		description,
		payload,
		level: log.level,
		user,
		language,
		timestamp: log.timestamp,
	};
};

const createCustomLogFunction = <T extends LogTypes>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	logFunction: any,
	isRemote: boolean
): customLogFunctionType<T> => {
	return (...props: customLogFunctionProps<T>) => {
		const logObject = new CustomLog(...props);
		logFunction(isRemote ? JSON.stringify(logObject) : logObject);
	};
};

const wrapLoggerFunctions = (
	logger: logConfig.Logger,
	isRemote = false
): void => {
	levels.forEach((level) => {
		const loggerFunction = level;
		const logFunction = level as keyof typeof logConfig;
		// eslint-disable-next-line no-param-reassign
		logger[loggerFunction] = createCustomLogFunction(
			logConfig[logFunction],
			isRemote
		);
	});
};

export { wrapLoggerFunctions, customLogJSON };
