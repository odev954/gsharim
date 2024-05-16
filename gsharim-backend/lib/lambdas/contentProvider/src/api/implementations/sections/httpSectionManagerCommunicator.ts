import ISectionManagerCommunicator, {
    SectionMethods
} from '@abstract/sectionManagerCommunicator';
import { HttpCommunicatorConfig } from '@api/types';
import GetSectionQuery from '@api/sections/queries/getSectionQuery';
import GetSectionGroupQuery from '@api/sections/queries/getSectionGroupsQuery';

export default class HttpSectionManagerCommunicator
    implements ISectionManagerCommunicator {
    private readonly configuration: HttpCommunicatorConfig;

    queries: {
        [SectionMethods.GetSection]: GetSectionQuery;
        [SectionMethods.GetSectionGroup]: GetSectionGroupQuery;
    };

    constructor() {
        this.configuration = {
            apiGatewayUrl: process.env.API_URL
        };

        this.queries = {
            [SectionMethods.GetSection]: new GetSectionQuery(
                this.configuration
            ),
            [SectionMethods.GetSectionGroup]: new GetSectionGroupQuery(
                this.configuration
            )
        };
    }
}
