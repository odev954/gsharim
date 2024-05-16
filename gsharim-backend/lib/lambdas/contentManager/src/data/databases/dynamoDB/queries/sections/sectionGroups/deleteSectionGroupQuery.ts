import {
    IQuery,
    ExecutionResult,
    safeQueryWrapperWithoutResult,
    checkIsDynamoError
} from '@eco8200/backend-common';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import { IdInput } from '@abstract/sectionsGroupDatabase';

export default class DeleteSectionGroupQuery
    implements IQuery<DynamoDBServiceException, IdInput, never>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        id
    }: IdInput): Promise<ExecutionResult<DynamoDBServiceException>> {
        const params = {
            TableName: process.env.SECTION_GROUP_COLLECTION,
            Key: {
                id: id
            }
        };
        console.info(`deleting section group <${id}>...`);
        return safeQueryWrapperWithoutResult<DynamoDBServiceException>(
            async () => {
                await this.database.send(new DeleteCommand(params));
            },
            checkIsDynamoError
        );
    }
}
