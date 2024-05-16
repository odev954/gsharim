import { ExecutionResult } from "../interfaces/query";
import { ErrorTypeCheck } from "./errorTypeCheckers";

type QueryCallback<TResult> = () => Promise<TResult>;

export async function safeQueryWrapper<TError extends Error, TResult>(
	query: QueryCallback<TResult>,
	errorTypeChecker: ErrorTypeCheck<TError>,
	silenceLogs = false
): Promise<ExecutionResult<TError, TResult>> {
	try {
		return { success: true, data: await query() };
	} catch (error) {
		if (!silenceLogs) {
			console.error(error);
		}
		if (!errorTypeChecker(error)) {
			throw new Error(`Error type mismatch. Got the error: ${error}`);
		}
		return {
			success: false,
			error: error,
		};
	}
}

export async function safeQueryWrapperWithoutResult<TError extends Error>(
	query: QueryCallback<void>,
	errorTypeChecker: ErrorTypeCheck<TError>,
	silenceLogs = false
): Promise<ExecutionResult<TError>> {
	try {
		await query();
		return { success: true };
	} catch (error) {
		if (!silenceLogs) {
			console.error(error);
		}
		if (!errorTypeChecker(error)) {
			throw new Error(`Error type mismatch. Got the error: ${error}`);
		}
		return {
			success: false,
			error: error,
		};
	}
}
