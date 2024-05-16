import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { IdInput, RecordListOutput } from '@abstract/sectionsGroupDatabase';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import {
    IQuery,
    ExecutionResult,
    checkIsDynamoOrZodError,
    safeQueryWrapper,
    SectionGroupRecordSchema
} from '@eco8200/backend-common';
import { ZodError } from 'zod';

export default class GetGroupsWithSection
    implements
    IQuery<DynamoDBServiceException | ZodError, IdInput, RecordListOutput>
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run({
        id
    }: IdInput): Promise<
        ExecutionResult<DynamoDBServiceException | ZodError, RecordListOutput>
    > {
        const params = {
            TableName: process.env.SECTION_GROUP_COLLECTION,
            FilterExpression: 'contains (sectionIds, :sectionId)',
            ExpressionAttributeValues: {
                ':sectionId': id
            }
        };

        console.info(`retrieving groups containing section <${id}>...`);
        return safeQueryWrapper<
            DynamoDBServiceException | ZodError,
            RecordListOutput
        >(async () => {
            const data = await this.database.send(new ScanCommand(params));

            return {
                records: SectionGroupRecordSchema.array().parse(data.Items)
            };
        }, checkIsDynamoOrZodError);
    }
}
