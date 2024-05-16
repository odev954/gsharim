import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import {
    IQuery,
    ExecutionResult,
    initRecord,
    safeQueryWrapperWithoutResult,
    checkIsDynamoError
} from '@eco8200/backend-common';
import { TaskRecordInput } from '@abstract/TasksDatabase';

export default class UpdateTaskQuery
    implements IQuery<DynamoDBServiceException, TaskRecordInput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        record
    }: TaskRecordInput): Promise<ExecutionResult<DynamoDBServiceException>> {
        const initializedRecord = initRecord(record, true);
        const params = {
            TableName: process.env.TASK_COLLECTION,
            Item: initializedRecord
        };

        console.info(`updating task ${record.id}...`);
        return safeQueryWrapperWithoutResult<DynamoDBServiceException>(
            async () => {
                await this.database.send(new PutCommand(params));
            },
            checkIsDynamoError
        );
    }
}
