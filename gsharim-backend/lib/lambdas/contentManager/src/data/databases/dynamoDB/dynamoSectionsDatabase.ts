import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import ISectionsDatabase from '@abstract/sectionsDatabase';
import {
    CreateSectionQuery,
    DeleteSectionQuery,
    GetSectionQuery,
    UpdateSectionQuery
} from './queries/sections';

export default class DynamoSectionsDatabase implements ISectionsDatabase {
    private database: DynamoDBClient;

    public readonly queries: {
        createSection: CreateSectionQuery;
        deleteSection: DeleteSectionQuery;
        getSection: GetSectionQuery;
        updateSection: UpdateSectionQuery;
    };

    public constructor() {
        if (process.env.REGION && process.env.DB_ENDPOINT) {
            this.database = new DynamoDBClient({
                region: process.env.REGION,
                endpoint: process.env.DB_ENDPOINT
            });
        } else {
            this.database = new DynamoDBClient({});
        }

        this.queries = {
            createSection: new CreateSectionQuery(this.database),
            deleteSection: new DeleteSectionQuery(this.database),
            getSection: new GetSectionQuery(this.database),
            updateSection: new UpdateSectionQuery(this.database)
        };
    }
}
