import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import {
    IQuery,
    ExecutionResult,
    initRecord,
    safeQueryWrapper,
    checkIsDynamoError
} from '@eco8200/backend-common';
import { TaskRecordInput, IdOutput } from '@abstract/TasksDatabase';

export default class CreateTaskQuery
    implements IQuery<DynamoDBServiceException, TaskRecordInput, IdOutput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        record
    }: TaskRecordInput): Promise<
        ExecutionResult<DynamoDBServiceException, IdOutput>
    > {
        const initializedRecord = initRecord(record);
        const params = {
            TableName: process.env.TASK_COLLECTION,
            Item: initializedRecord
        };

        console.info(`creating task...`);
        return safeQueryWrapper<DynamoDBServiceException, IdOutput>(
            async () => {
                await this.database.send(new PutCommand(params));

                return { id: initializedRecord.id };
            },
            checkIsDynamoError
        );
    }
}
