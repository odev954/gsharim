import {
    ExecutionResult,
    IQuery,
    TaskModel,
    TaskModelSchema,
    safeQueryWrapper
} from '@eco8200/backend-common';
import {
    GetTaskQueryInput,
    GetTaskQueryOutput
} from '@abstract/contentManagerCommunicator';
import { HttpCommunicatorConfig } from '@api/types';
import consts from '@api/content/consts';
import axios, { AxiosError } from 'axios';
import { checkIsAxiosOrZodError } from '@eco8200/backend-common/common/utils/errorTypeCheckers';
import { ZodError } from 'zod';

export default class GetTaskQuery
    implements
    IQuery<AxiosError | ZodError, GetTaskQueryInput, GetTaskQueryOutput>
{
    constructor(private readonly configuration: HttpCommunicatorConfig) { }

    async run(
        request: GetTaskQueryInput
    ): Promise<ExecutionResult<AxiosError | ZodError, GetTaskQueryOutput>> {
        console.info(`fetching task <${request.taskId}>...`);
        return safeQueryWrapper(async () => {
            const response = await axios.get<TaskModel>(
                `${this.configuration.apiGatewayUrl}/${consts.TaskUrl}/${request.taskId}`
            );

            return { task: TaskModelSchema.parse(response.data) };
        }, checkIsAxiosOrZodError);
    }
}
