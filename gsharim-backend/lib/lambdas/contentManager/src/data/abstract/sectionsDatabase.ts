import {
    IQueriable,
    IQueryParameters,
    IQueryResponse,
    IQuery,
    IRecord
} from '@eco8200/backend-common';

export enum SectionQueryTypes {
    GetSection = 'getSection',
    DeleteSection = 'deleteSection',
    CreateSection = 'createSection',
    UpdateSection = 'updateSection'
}

export interface RecordInput extends IQueryParameters {
    record: IRecord;
}

export interface IdInput extends IQueryParameters {
    id: string;
}

export interface RecordOutput extends IQueryResponse {
    record: IRecord;
}

export interface IdOutput extends IQueryResponse {
    id: string;
}

export default interface ISectionsDatabase
    extends IQueriable<SectionQueryTypes> {
    queries: {
        [SectionQueryTypes.CreateSection]: IQuery<Error, RecordInput, IdOutput>;
        [SectionQueryTypes.DeleteSection]: IQuery<Error, IdInput>;
        [SectionQueryTypes.GetSection]: IQuery<Error, IdInput, RecordOutput>;
        [SectionQueryTypes.UpdateSection]: IQuery<Error, RecordInput>;
    };
}
