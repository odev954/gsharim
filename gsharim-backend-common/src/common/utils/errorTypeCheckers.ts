import { ZodError } from "zod";
import { DynamoDBServiceException } from "@aws-sdk/client-dynamodb";
import { AxiosError, isAxiosError } from "axios";

export type ErrorTypeCheck<TError extends Error> = (
	error: unknown
) => error is TError;

export const checkIsZodError: ErrorTypeCheck<ZodError> = (
	error: unknown
): error is ZodError => {
	return error instanceof ZodError;
};

export const checkIsDynamoError: ErrorTypeCheck<DynamoDBServiceException> = (
	error: unknown
): error is DynamoDBServiceException => {
	return error instanceof DynamoDBServiceException;
};

export const checkIsDynamoOrZodError: ErrorTypeCheck<
	ZodError | DynamoDBServiceException
> = (error: unknown): error is ZodError | DynamoDBServiceException => {
	return checkIsDynamoError(error) || checkIsZodError(error);
};

export const checkIsAxiosError: ErrorTypeCheck<AxiosError> = (
	error: unknown
): error is AxiosError => {
	return isAxiosError(error);
};

export const checkIsAxiosOrZodError: ErrorTypeCheck<ZodError | AxiosError> = (
	error: unknown
): error is ZodError | AxiosError => {
	return checkIsAxiosError(error) || checkIsZodError(error);
};
