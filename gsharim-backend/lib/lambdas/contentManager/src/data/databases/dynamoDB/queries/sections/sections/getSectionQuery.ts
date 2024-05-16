import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { IdInput, RecordOutput } from '@abstract/sectionsDatabase';
import {
    DynamoDBClient,
    DynamoDBServiceException,
    ResourceNotFoundException
} from '@aws-sdk/client-dynamodb';
import {
    IQuery,
    ExecutionResult,
    IRecordSchema,
    safeQueryWrapper,
    checkIsDynamoOrZodError
} from '@eco8200/backend-common';
import { ZodError } from 'zod';

export default class GetSectionQuery
    implements
        IQuery<DynamoDBServiceException | ZodError, IdInput, RecordOutput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        id
    }: IdInput): Promise<
        ExecutionResult<DynamoDBServiceException | ZodError, RecordOutput>
    > {
        const params = {
            TableName: process.env.SECTION_COLLECTION,
            Key: {
                id: id
            }
        };

        console.info(`retrieving section <${id}>...`);
        return safeQueryWrapper<
            DynamoDBServiceException | ZodError,
            RecordOutput
        >(async () => {
            const data = await this.database.send(new GetCommand(params));

            if (!data.Item)
                throw new ResourceNotFoundException({
                    message: 'the returned item is undefined',
                    $metadata: data.$metadata
                });

            return { record: IRecordSchema.parse(data.Item) };
        }, checkIsDynamoOrZodError);
    }
}
