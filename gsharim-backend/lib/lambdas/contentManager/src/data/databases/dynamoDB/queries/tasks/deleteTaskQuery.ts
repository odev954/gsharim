import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import {
    IQuery,
    ExecutionResult,
    checkIsDynamoError,
    safeQueryWrapperWithoutResult
} from '@eco8200/backend-common';
import { IdInput } from '@abstract/TasksDatabase';

export default class DeleteTaskQuery
    implements IQuery<DynamoDBServiceException, IdInput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        id
    }: IdInput): Promise<ExecutionResult<DynamoDBServiceException>> {
        const params = {
            TableName: process.env.TASK_COLLECTION,
            Key: {
                id: id
            }
        };

        console.info(`deleting task <${id}> from database...`);
        return safeQueryWrapperWithoutResult<DynamoDBServiceException>(
            async () => {
                await this.database.send(new DeleteCommand(params));
            },
            checkIsDynamoError
        );
    }
}
