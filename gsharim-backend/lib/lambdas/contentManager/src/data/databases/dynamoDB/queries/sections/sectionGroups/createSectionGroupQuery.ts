import {
    IQuery,
    ExecutionResult,
    checkIsDynamoError,
    safeQueryWrapper,
    initRecord
} from '@eco8200/backend-common';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import { IdOutput, RecordInput } from '@abstract/sectionsGroupDatabase';

export default class CreateSectionGroupQuery
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
            TableName: process.env.SECTION_GROUP_COLLECTION,
            Item: initializedRecord
        };
        console.info(`creating section group...`);
        return safeQueryWrapper<DynamoDBServiceException, IdOutput>(
            async () => {
                await this.database.send(new PutCommand(params));

                return { id: initializedRecord.id };
            },
            checkIsDynamoError
        );
    }
}
