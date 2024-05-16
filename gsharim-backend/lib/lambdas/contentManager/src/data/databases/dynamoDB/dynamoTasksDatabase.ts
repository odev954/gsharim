import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import ITasksDatabase from '@abstract/TasksDatabase';
import {
    CreateTaskQuery,
    DeleteTaskQuery,
    FilterTasksQuery,
    GetTaskQuery,
    UpdateTaskQuery
} from './queries/tasks';

export default class DynamoTasksDatabase implements ITasksDatabase {
    private database: DynamoDBClient;

    public readonly queries: {
        createTask: CreateTaskQuery;
        deleteTask: DeleteTaskQuery;
        getTask: GetTaskQuery;
        updateTask: UpdateTaskQuery;
        filterTasks: FilterTasksQuery;
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
            createTask: new CreateTaskQuery(this.database),
            deleteTask: new DeleteTaskQuery(this.database),
            getTask: new GetTaskQuery(this.database),
            updateTask: new UpdateTaskQuery(this.database),
            filterTasks: new FilterTasksQuery(this.database)
        };
    }
}
