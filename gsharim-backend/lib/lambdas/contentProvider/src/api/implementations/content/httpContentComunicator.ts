import IContentManagerCommunicator, {
    ContentMethods
} from '@abstract/contentManagerCommunicator';
import { HttpCommunicatorConfig } from '@api/types';
import FilterTasksQuery from '@api/content/queries/filterTasksQuery';
import GetTaskQuery from '@api/content/queries/getTaskQuery';

export default class HttpContentManagerCommunicator
    implements IContentManagerCommunicator {
    private readonly configuration: HttpCommunicatorConfig;

    queries: {
        [ContentMethods.GetTask]: GetTaskQuery;
        [ContentMethods.FilterTasks]: FilterTasksQuery;
    };

    constructor() {
        this.configuration = {
            apiGatewayUrl: process.env.API_URL
        };

        this.queries = {
            [ContentMethods.GetTask]: new GetTaskQuery(this.configuration),
            [ContentMethods.FilterTasks]: new FilterTasksQuery(
                this.configuration
            )
        };
    }
}
