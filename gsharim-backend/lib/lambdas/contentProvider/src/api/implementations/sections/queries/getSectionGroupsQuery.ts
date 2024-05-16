import {
    ExecutionResult,
    IQuery,
    SectionGroupModel,
    SectionGroupModelSchema,
    safeQueryWrapper
} from '@eco8200/backend-common';
import { HttpCommunicatorConfig } from '@api/types';
import consts from '@api/sections/consts';
import axios, { AxiosError } from 'axios';
import {
    GetSectionGroupQueryInput,
    GetSectionGroupQueryOutput
} from '@abstract/sectionManagerCommunicator';
import { ZodError } from 'zod';
import { checkIsAxiosOrZodError } from '@eco8200/backend-common/common/utils/errorTypeCheckers';

export default class GetSectionGroupQuery
    implements
    IQuery<
        AxiosError | ZodError,
        GetSectionGroupQueryInput,
        GetSectionGroupQueryOutput
    >
{
    constructor(private readonly configuration: HttpCommunicatorConfig) { }

    async run(
        request: GetSectionGroupQueryInput
    ): Promise<
        ExecutionResult<AxiosError | ZodError, GetSectionGroupQueryOutput>
    > {
        console.info(`fetching section group <${request.sectionGroupId}>...`);
        return safeQueryWrapper(async () => {
            const response = await axios.get<SectionGroupModel>(
                `${this.configuration.apiGatewayUrl}/${consts.GetSectionGroupUrl}/${request.sectionGroupId}`
            );

            return {
                sectionGroup: SectionGroupModelSchema.parse(response.data)
            };
        }, checkIsAxiosOrZodError);
    }
}
