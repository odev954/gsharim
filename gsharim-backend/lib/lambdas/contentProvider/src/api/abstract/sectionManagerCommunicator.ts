import {
    IQueriable,
    IQuery,
    IQueryParameters,
    IQueryResponse,
    SectionGroupModel
} from '@eco8200/backend-common';
import { ISectionData } from '@eco8200/data-models';

export enum SectionMethods {
    GetSection = 'getSection',
    GetSectionGroup = 'getSectionGroup'
}

export interface GetSectionQueryInput extends IQueryParameters {
    sectionId: string;
}

export interface GetSectionGroupQueryInput extends IQueryParameters {
    sectionGroupId: string;
}

export interface GetSectionQueryOutput extends IQueryResponse {
    section: ISectionData;
}

export interface GetSectionGroupQueryOutput extends IQueryResponse {
    sectionGroup: SectionGroupModel;
}

export default interface ISectionManagerCommunicator
    extends IQueriable<SectionMethods> {
    queries: {
        [SectionMethods.GetSection]: IQuery<
            Error,
            GetSectionQueryInput,
            GetSectionQueryOutput
        >;
        [SectionMethods.GetSectionGroup]: IQuery<
            Error,
            GetSectionGroupQueryInput,
            GetSectionGroupQueryOutput
        >;
    };
}
