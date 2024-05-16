import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import ISectionsGroupDatabase from '@abstract/sectionsGroupDatabase';
import {
    CreateSectionGroupQuery,
    DeleteSectionGroupQuery,
    GetGroupsWithSectionQuery,
    GetSectionGroupQuery,
    UpdateSectionGroupQuery
} from './queries/sections';

export default class DynamoSectionGroupDatabase
    implements ISectionsGroupDatabase
{
    private database: DynamoDBClient;

    public readonly queries: {
        createGroup: CreateSectionGroupQuery;
        deleteGroup: DeleteSectionGroupQuery;
        getGroup: GetSectionGroupQuery;
        updateGroup: UpdateSectionGroupQuery;
        getGroupsWithSection: GetGroupsWithSectionQuery;
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
            createGroup: new CreateSectionGroupQuery(this.database),
            deleteGroup: new DeleteSectionGroupQuery(this.database),
            getGroup: new GetSectionGroupQuery(this.database),
            updateGroup: new UpdateSectionGroupQuery(this.database),
            getGroupsWithSection: new GetGroupsWithSectionQuery(this.database)
        };
    }
}
