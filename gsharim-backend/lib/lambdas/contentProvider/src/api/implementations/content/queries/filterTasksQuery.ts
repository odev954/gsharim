import {
    ExecutionResult,
    IQuery,
    TaskModel,
    TaskModelSchema,
    safeQueryWrapper
} from '@eco8200/backend-common';
import {
    FilterTasksQueryInput,
    FilterTasksQueryOutput
} from '@abstract/contentManagerCommunicator';
import { HttpCommunicatorConfig } from '@api/types';
import consts from '@api/content/consts';
import axios, { AxiosError } from 'axios';
import { checkIsAxiosOrZodError } from '@eco8200/backend-common/common/utils/errorTypeCheckers';
import { ZodError } from 'zod';

export default class FilterTasksQuery
    implements
    IQuery<
        AxiosError | ZodError,
        FilterTasksQueryInput,
        FilterTasksQueryOutput
    >
{
    constructor(private readonly configuration: HttpCommunicatorConfig) { }

    async run(
        request: FilterTasksQueryInput
    ): Promise<ExecutionResult<AxiosError | ZodError, FilterTasksQueryOutput>> {
        console.info(`fetching tasks by lesson id <${request.lessonId}>...`);
        return safeQueryWrapper(async () => {
            let url = this.configuration.apiGatewayUrl + '/' + consts.TaskUrl;
            if (request.lessonId) {
                url += `?lessonId=${request.lessonId}`;
            }
            const response = await axios.get<TaskModel[]>(url);

            return { tasks: TaskModelSchema.array().parse(response.data) };
        }, checkIsAxiosOrZodError);
    }
}
