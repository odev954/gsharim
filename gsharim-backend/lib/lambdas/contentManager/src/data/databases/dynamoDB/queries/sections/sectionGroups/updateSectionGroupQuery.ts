import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import {
    IQuery,
    ExecutionResult,
    safeQueryWrapperWithoutResult,
    checkIsDynamoError,
    initRecord
} from '@eco8200/backend-common';
import { RecordInput } from '@abstract/sectionsGroupDatabase';

export default class UpdateSectionGroupQuery
    implements IQuery<DynamoDBServiceException, RecordInput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        record
    }: RecordInput): Promise<ExecutionResult<DynamoDBServiceException>> {
        const initializedRecord = initRecord(record, true);
        const params = {
            TableName: process.env.SECTION_GROUP_COLLECTION,
            Item: initializedRecord
        };

        console.info(`updating section group <${record.id}>...`);
        return safeQueryWrapperWithoutResult<DynamoDBServiceException>(
            async () => {
                await this.database.send(new PutCommand(params));
            },
            checkIsDynamoError
        );
    }
}
