import { IQuery, ExecutionResult } from '@eco8200/backend-common';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import ISectionManagerCommunicator, {
    SectionMethods,
    GetSectionGroupQueryInput,
    GetSectionGroupQueryOutput,
    GetSectionQueryInput,
    GetSectionQueryOutput
} from '@abstract/sectionManagerCommunicator';
import { notFoundErrorMock, sectionGroupMocks, sectionMocks } from './mocks';

class GetSectionMock
    implements
    IQuery<
        AxiosError | ZodError,
        GetSectionQueryInput,
        GetSectionQueryOutput
    >
{
    async run({
        sectionId
    }: GetSectionQueryInput): Promise<
        ExecutionResult<AxiosError | ZodError, GetSectionQueryOutput>
    > {
        if (!sectionMocks[sectionId])
            return {
                success: false,
                error: notFoundErrorMock
            };

        return {
            success: true,
            data: {
                section: sectionMocks[sectionId]
            }
        };
    }
}

class GetSectionGroupMock
    implements
    IQuery<
        AxiosError | ZodError,
        GetSectionGroupQueryInput,
        GetSectionGroupQueryOutput
    >
{
    async run({
        sectionGroupId
    }: GetSectionGroupQueryInput): Promise<
        ExecutionResult<AxiosError | ZodError, GetSectionGroupQueryOutput>
    > {
        const group = sectionGroupMocks[sectionGroupId];
        if (!sectionGroupMocks[sectionGroupId])
            return {
                success: false,
                error: notFoundErrorMock
            };

        return {
            success: true,
            data: {
                sectionGroup: {
                    id: group.id,
                    layout: group.layout,
                    sections: group.sectionIds.map((id) => sectionMocks[id])
                }
            }
        };
    }
}

export default class SectionCommunicatorMock
    implements ISectionManagerCommunicator {
    queries: {
        [SectionMethods.GetSection]: GetSectionMock;
        [SectionMethods.GetSectionGroup]: GetSectionGroupMock;
    };

    constructor() {
        this.queries = {
            [SectionMethods.GetSection]: new GetSectionMock(),
            [SectionMethods.GetSectionGroup]: new GetSectionGroupMock()
        };
    }
}
