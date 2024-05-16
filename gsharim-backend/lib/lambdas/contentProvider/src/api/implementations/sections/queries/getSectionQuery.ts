import {
    ExecutionResult,
    IQuery,
    safeQueryWrapper
} from '@eco8200/backend-common';
import { HttpCommunicatorConfig } from '@api/types';
import consts from '@api/sections/consts';
import axios, { AxiosError } from 'axios';
import {
    GetSectionQueryInput,
    GetSectionQueryOutput
} from '@abstract/sectionManagerCommunicator';
import { ISectionData, ISectionDataSchema } from '@eco8200/data-models';
import { ZodError } from 'zod';
import { checkIsAxiosOrZodError } from '@eco8200/backend-common/common/utils/errorTypeCheckers';

export default class GetSectionQuery
    implements
    IQuery<
        AxiosError | ZodError,
        GetSectionQueryInput,
        GetSectionQueryOutput
    >
{
    constructor(private readonly configuration: HttpCommunicatorConfig) { }

    async run(
        request: GetSectionQueryInput
    ): Promise<ExecutionResult<AxiosError | ZodError, GetSectionQueryOutput>> {
        console.info(`fetching section <${request.sectionId}>...`);
        return safeQueryWrapper(async () => {
            const response = await axios.get<ISectionData>(
                `${this.configuration.apiGatewayUrl}/${consts.GetSectionUrl}/${request.sectionId}`
            );

            return { section: ISectionDataSchema.parse(response.data) };
        }, checkIsAxiosOrZodError);
    }
}
