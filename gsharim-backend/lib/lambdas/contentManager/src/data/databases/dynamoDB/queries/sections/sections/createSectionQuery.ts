import {
    IQuery,
    ExecutionResult,
    safeQueryWrapper,
    checkIsDynamoError,
    initRecord
} from '@eco8200/backend-common';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import { IdOutput, RecordInput } from '@abstract/sectionsDatabase';

export default class CreateSectionQuery
    implements IQuery<DynamoDBServiceException, RecordInput, IdOutput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        record
    }: RecordInput): Promise<
        ExecutionResult<DynamoDBServiceException, IdOutput>
    > {
        const initializedRecord = initRecord(record);
        const params = {
            TableName: process.env.SECTION_COLLECTION,
            Item: initializedRecord
        };

        console.info(`creating section...`);
        return safeQueryWrapper<DynamoDBServiceException, IdOutput>(
            async () => {
                await this.database.send(new PutCommand(params));

                return { id: initializedRecord.id };
            },
            checkIsDynamoError
        );
    }
}
