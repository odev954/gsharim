import { IQuery, ExecutionResult } from '@eco8200/backend-common';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import IContentManagerCommunicator, {
    ContentMethods,
    FilterTasksQueryInput,
    FilterTasksQueryOutput,
    GetTaskQueryInput,
    GetTaskQueryOutput
} from '@abstract/contentManagerCommunicator';
import { notFoundErrorMock, taskMocks } from './mocks';

class GetTaskMock
    implements
    IQuery<AxiosError | ZodError, GetTaskQueryInput, GetTaskQueryOutput>
{
    async run({
        taskId
    }: GetTaskQueryInput): Promise<
        ExecutionResult<AxiosError | ZodError, GetTaskQueryOutput>
    > {
        if (!taskMocks[taskId])
            return {
                success: false,
                error: notFoundErrorMock
            };

        return {
            success: true,
            data: {
                task: taskMocks[taskId]
            }
        };
    }
}

class FilterTasksMock
    implements
    IQuery<
        AxiosError | ZodError,
        FilterTasksQueryInput,
        FilterTasksQueryOutput
    >
{
    async run({
        lessonId
    }: FilterTasksQueryInput): Promise<
        ExecutionResult<AxiosError | ZodError, FilterTasksQueryOutput>
    > {
        return {
            success: true,
            data: {
                tasks: lessonId
                    ? Object.values(taskMocks).filter(
                        (task) => lessonId === task.lessonId
                    )
                    : Object.values(taskMocks)
            }
        };
    }
}

export default class ContentManagerCommunicatorMock
    implements IContentManagerCommunicator {
    queries: {
        [ContentMethods.GetTask]: GetTaskMock;
        [ContentMethods.FilterTasks]: FilterTasksMock;
    };

    constructor() {
        this.queries = {
            [ContentMethods.GetTask]: new GetTaskMock(),
            [ContentMethods.FilterTasks]: new FilterTasksMock()
        };
    }
}
