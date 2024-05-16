import {
    IQueryParameters,
    IQueryResponse,
    TaskRecord,
    IQueriable,
    IQuery
} from '@eco8200/backend-common';

export enum ContentQueryTypes {
    GetTask = 'getTask',
    UpdateTask = 'updateTask',
    CreateTask = 'createTask',
    DeleteTask = 'deleteTask',
    FilterTasks = 'filterTasks'
}

export interface TaskRecordInput extends IQueryParameters {
    record: TaskRecord;
}

export interface IdInput extends IQueryParameters {
    id: string;
}

export interface FilterInput extends IQueryParameters {
    lessonId?: string;
}

export interface IdOutput extends IQueryResponse {
    id: string;
}

export interface TaskRecordOutput extends IQueryResponse {
    record: TaskRecord;
}

export interface TaskArrayOutput extends IQueryResponse {
    records: TaskRecord[];
}

export default interface ITasksDatabase extends IQueriable<ContentQueryTypes> {
    queries: {
        [ContentQueryTypes.CreateTask]: IQuery<
            Error,
            TaskRecordInput,
            IdOutput
        >;
        [ContentQueryTypes.DeleteTask]: IQuery<Error, IdInput>;
        [ContentQueryTypes.GetTask]: IQuery<Error, IdInput, TaskRecordOutput>;
        [ContentQueryTypes.UpdateTask]: IQuery<Error, TaskRecordInput>;
        [ContentQueryTypes.FilterTasks]: IQuery<
            Error,
            FilterInput,
            TaskArrayOutput
        >;
    };
}
