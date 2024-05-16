import {
    DynamoDBDocumentClient,
    ScanCommand,
    ScanCommandInput
} from '@aws-sdk/lib-dynamodb';
import {
    DynamoDBClient,
    DynamoDBServiceException
} from '@aws-sdk/client-dynamodb';
import {
    IQuery,
    ExecutionResult,
    TaskRecordSchema,
    checkIsDynamoOrZodError,
    safeQueryWrapper
} from '@eco8200/backend-common';
import { FilterInput, TaskArrayOutput } from '@abstract/TasksDatabase';
import { ZodError } from 'zod';

export default class FilterTasksQuery
    implements
        IQuery<
            DynamoDBServiceException | ZodError,
            FilterInput,
            TaskArrayOutput
        >
{
    private database: DynamoDBDocumentClient;

    public constructor(databaseClient: DynamoDBClient) {
        this.database = databaseClient;
    }

    async run(
        input: FilterInput
    ): Promise<
        ExecutionResult<DynamoDBServiceException | ZodError, TaskArrayOutput>
    > {
        const filter = this.getFilter(input);
        const params: ScanCommandInput = {
            TableName: process.env.TASK_COLLECTION,
            ...filter
        };

        console.info(`filtering tasks...`);
        console.info(`filter settings: ${JSON.stringify(input)}`);
        return safeQueryWrapper<
            DynamoDBServiceException | ZodError,
            TaskArrayOutput
        >(async () => {
            const data = await this.database.send(new ScanCommand(params));

            return {
                records: TaskRecordSchema.array().parse(data.Items)
            };
        }, checkIsDynamoOrZodError);
    }

    private getFilter(input: FilterInput) {
        const supportedFilters = {
            lessonId: {
                FilterExpression: 'lessonId = :lessonId',
                ExpressionAttributeValues: {
                    ':lessonId': input.lessonId
                }
            }
        };
        const appliedConditions = [];
        const appliedAttributes = [];
        const attributeValues = {};

        Object.entries(input).forEach((entry) => {
            const [key, value] = entry;

            if (value && supportedFilters[key]) {
                appliedConditions.push(supportedFilters[key].FilterExpression);
                appliedAttributes.push(
                    supportedFilters[key].ExpressionAttributeValues
                );
            }
        });

        appliedAttributes.forEach((attribute) => {
            const keys = Object.keys(attribute);

            keys.forEach((key) => {
                attributeValues[key] = attribute[key];
            });
        });

        return {
            FilterExpression: appliedConditions.join(' and '),
            ExpressionAttributeValues: attributeValues
        };
    }
}
