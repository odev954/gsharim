import { HttpException, InternalServerErrorException } from "@nestjs/common";
import { transformDynamoError } from "./transformDynamoError";
import { transformAxiosError } from "./transformAxiosError";
import {
	checkIsAxiosError,
	checkIsDynamoError,
} from "../utils/errorTypeCheckers";

type TransformersMap = [
	(error: Error) => boolean,
	(error: Error) => HttpException
][];

const defaultTransformers: TransformersMap = [
	[checkIsDynamoError, transformDynamoError],
	[checkIsAxiosError, transformAxiosError],
];

export default function buildHttpError(
	error: Error,
	transformers = defaultTransformers
): HttpException {
	const record = transformers.find(([checker, _transformer]) =>
		checker(error)
	);

	if (record) {
		const [_checker, transformer] = record;
		return transformer(error);
	}
	return new InternalServerErrorException();
}
