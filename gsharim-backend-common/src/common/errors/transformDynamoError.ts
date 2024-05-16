import {
	ConflictException,
	HttpException,
	InternalServerErrorException,
	NotAcceptableException,
	NotFoundException,
	ServiceUnavailableException,
} from "@nestjs/common";
import {
	ConditionalCheckFailedException,
	LimitExceededException,
	ProvisionedThroughputExceededException,
	ResourceNotFoundException,
	TableInUseException,
	DuplicateItemException,
	TransactionInProgressException,
	DynamoDBServiceException,
} from "@aws-sdk/client-dynamodb";

const transformers = {
	[ConditionalCheckFailedException.name]: (error: DynamoDBServiceException) =>
		new NotAcceptableException(error.message, {
			cause: error,
		}),
	[LimitExceededException.name]: (_: DynamoDBServiceException) =>
		new ServiceUnavailableException(),
	[ProvisionedThroughputExceededException.name]: (
		_: DynamoDBServiceException
	) => new ServiceUnavailableException(),
	[ResourceNotFoundException.name]: (error: DynamoDBServiceException) =>
		new NotFoundException(error.message, {
			cause: error,
		}),
	[TableInUseException.name]: (_: DynamoDBServiceException) =>
		new ServiceUnavailableException(),
	[DuplicateItemException.name]: (error: DynamoDBServiceException) =>
		new ConflictException(error.message, {
			cause: error,
		}),
	[TransactionInProgressException.name]: (_: DynamoDBServiceException) =>
		new ServiceUnavailableException(),
};

export function transformDynamoError(error: Error): HttpException {
	if (error instanceof DynamoDBServiceException) {
		const transformerKey = error.constructor.name;
		const transformer = transformers[transformerKey];

		if (transformer) return transformer(error);
	}
	return new InternalServerErrorException();
}
