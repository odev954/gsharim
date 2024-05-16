import {
    SectionGroupRecord,
    IQueryParameters,
    IQueryResponse,
    IQueriable,
    IQuery
} from '@eco8200/backend-common';

export enum SectionsGroupQueryTypes {
    GetGroup = 'getGroup',
    DeleteGroup = 'deleteGroup',
    CreateGroup = 'createGroup',
    UpdateGroup = 'updateGroup',
    GetGroupsWithSection = 'getGroupsWithSection'
}

export interface RecordInput extends IQueryParameters {
    record: SectionGroupRecord;
}

export interface IdInput extends IQueryParameters {
    id: string;
}

export interface RecordOutput extends IQueryResponse {
    record: SectionGroupRecord;
}

export interface RecordListOutput extends IQueryResponse {
    records: SectionGroupRecord[];
}

export interface IdOutput extends IQueryResponse {
    id: string;
}

export default interface ISectionsGroupDatabase
    extends IQueriable<SectionsGroupQueryTypes> {
    queries: {
        [SectionsGroupQueryTypes.CreateGroup]: IQuery<
            Error,
            RecordInput,
            IdOutput
        >;
        [SectionsGroupQueryTypes.DeleteGroup]: IQuery<Error, IdInput>;
        [SectionsGroupQueryTypes.GetGroup]: IQuery<
            Error,
            IdInput,
            RecordOutput
        >;
        [SectionsGroupQueryTypes.UpdateGroup]: IQuery<Error, RecordInput>;
        [SectionsGroupQueryTypes.GetGroupsWithSection]: IQuery<
            Error,
            IdInput,
            RecordListOutput
        >;
    };
}
