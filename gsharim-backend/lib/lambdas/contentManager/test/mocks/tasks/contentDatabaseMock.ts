import { ExecutionResult, IQuery } from '@eco8200/backend-common';
import ITasksDatabase, {
    FilterInput,
    IdInput,
    IdOutput,
    TaskArrayOutput,
    TaskRecordInput,
    TaskRecordOutput
} from '../../../src/data/abstract/TasksDatabase';
import { taskMocks } from './taskMocks';
import { ResourceNotFoundException } from '@aws-sdk/client-dynamodb';

class GetTaskMock implements IQuery<Error, IdInput, TaskRecordOutput> {
    async run({
        id
    }: IdInput): Promise<ExecutionResult<Error, TaskRecordOutput>> {
        if (!taskMocks[id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };

        return {
            success: true,
            data: { record: taskMocks[id] }
        };
    }
}

class DeleteTaskMock implements IQuery<Error, IdInput> {
    async run({ id }: IdInput): Promise<ExecutionResult<Error>> {
        if (!taskMocks[id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };

        return {
            success: true
        };
    }
}

class CreateTaskMock implements IQuery<Error, TaskRecordInput, IdOutput> {
    async run({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        record
    }: TaskRecordInput): Promise<ExecutionResult<Error, IdOutput>> {
        return {
            success: true,
            data: { id: '38aa16ea-69b5-4d2e-abb0-8d512094b430' }
        };
    }
}

class UpdateTaskMock implements IQuery<Error, TaskRecordInput> {
    async run({ record }: TaskRecordInput): Promise<ExecutionResult<Error>> {
        if (!taskMocks[record.id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };
        return { success: true };
    }
}

class FilterTasksMock implements IQuery<Error, FilterInput, TaskArrayOutput> {
    async run(
        input: FilterInput
    ): Promise<ExecutionResult<Error, TaskArrayOutput>> {
        if (!input.lessonId)
            return {
                success: true,
                data: { records: Object.values(taskMocks) }
            };

        return {
            success: true,
            data: {
                records: Object.values(taskMocks).filter(
                    (task) => input.lessonId === task.lessonId
                )
            }
        };
    }
}

export class ContentDatabaseMock implements ITasksDatabase {
    public readonly queries: {
        createTask: CreateTaskMock;
        deleteTask: DeleteTaskMock;
        getTask: GetTaskMock;
        updateTask: UpdateTaskMock;
        filterTasks: FilterTasksMock;
    };

    constructor() {
        this.queries = {
            createTask: new CreateTaskMock(),
            deleteTask: new DeleteTaskMock(),
            getTask: new GetTaskMock(),
            updateTask: new UpdateTaskMock(),
            filterTasks: new FilterTasksMock()
        };
    }
}
