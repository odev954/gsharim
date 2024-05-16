import log from "loglevel";
import remote from "loglevel-plugin-remote";
import { remoteLoggerOptions } from "./loggerConfig";
import { wrapLoggerFunctions } from "./loggerUtils";

// loglevel-plugin-remote not supporting ts, so import won't work
const consoleLogger = log.getLogger("closedClientLogger");
const remoteLogger = log.getLogger("remoteServerLogger");

log.enableAll();
consoleLogger.enableAll();
remoteLogger.enableAll();

wrapLoggerFunctions(consoleLogger); // optionaly
remote.apply(log, remoteLoggerOptions);
wrapLoggerFunctions(remoteLogger, true);

export { consoleLogger, remoteLogger };
