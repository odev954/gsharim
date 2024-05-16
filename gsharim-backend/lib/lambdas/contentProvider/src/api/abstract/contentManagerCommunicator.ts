import {
    IQueriable,
    IQuery,
    IQueryParameters,
    IQueryResponse,
    TaskModel
} from '@eco8200/backend-common';

export enum ContentMethods {
    GetTask = 'getTask',
    FilterTasks = 'filterTasks'
}

export interface GetTaskQueryInput extends IQueryParameters {
    taskId: string;
}

export interface FilterTasksQueryInput extends IQueryResponse {
    lessonId?: string;
}

export interface GetTaskQueryOutput extends IQueryParameters {
    task: TaskModel;
}

export interface FilterTasksQueryOutput extends IQueryResponse {
    tasks: TaskModel[];
}

export default interface IContentManagerCommunicator
    extends IQueriable<ContentMethods> {
    queries: {
        [ContentMethods.GetTask]: IQuery<
            Error,
            GetTaskQueryInput,
            GetTaskQueryOutput
        >;
        [ContentMethods.FilterTasks]: IQuery<
            Error,
            FilterTasksQueryInput,
            FilterTasksQueryOutput
        >;
    };
}
