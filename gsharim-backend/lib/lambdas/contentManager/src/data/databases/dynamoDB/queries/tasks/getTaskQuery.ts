import {
    DynamoDBDocumentClient,
    GetCommand,
    GetCommandInput
} from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException,
    ResourceNotFoundException
} from '@aws-sdk/client-dynamodb';
import {
    IQuery,
    ExecutionResult,
    TaskRecordSchema,
    checkIsDynamoOrZodError,
    safeQueryWrapper
} from '@eco8200/backend-common';
import { IdInput, TaskRecordOutput } from '@abstract/TasksDatabase';
import { ZodError } from 'zod';

export default class GetTaskQuery
    implements
        IQuery<DynamoDBServiceException | ZodError, IdInput, TaskRecordOutput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        id
    }: IdInput): Promise<
        ExecutionResult<DynamoDBServiceException | ZodError, TaskRecordOutput>
    > {
        const params: GetCommandInput = {
            TableName: process.env.TASK_COLLECTION,
            Key: {
                id: id
            }
        };

        console.info(`retrieving task <${id}>...`);
        return safeQueryWrapper<
            DynamoDBServiceException | ZodError,
            TaskRecordOutput
        >(async () => {
            const data = await this.database.send(new GetCommand(params));

            if (!data.Item)
                throw new ResourceNotFoundException({
                    message: 'the returned item is undefined',
                    $metadata: data.$metadata
                });

            return { record: TaskRecordSchema.parse(data.Item) };
        }, checkIsDynamoOrZodError);
    }
}
