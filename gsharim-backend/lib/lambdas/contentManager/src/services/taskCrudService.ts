import { Inject, Injectable } from '@nestjs/common';
import ITasksDatabase from '@abstract/TasksDatabase';
import { consts } from '@consts';
import TaskModelConverter from '@converters/TaskModelConverter';
import { RecordId, TaskData, TaskModel, buildHttpError } from '@eco8200/backend-common';
import TaskDataConverter from '@converters/TaskDataConverter';

@Injectable()
export class TaskCrudService {
    private readonly modelConverter = new TaskModelConverter();
    private readonly dataConverter = new TaskDataConverter();

    constructor(
        @Inject(consts.TasksDatabaseInjectToken)
        private readonly database: ITasksDatabase
    ) { }

    async filterTasks(lessonId?: string): Promise<TaskModel[]> {
        const query = this.database.queries.filterTasks;

        const result = await query.run({ lessonId: lessonId });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(
            lessonId
                ? `successfully retreived all tasks of lesson <${lessonId}>`
                : `successfully retreived all tasks`
        );

        return result.data.records.map((task) =>
            this.modelConverter.toDataTransfer(task)
        );
    }

    async getTask(taskId: string): Promise<TaskModel> {
        const query = this.database.queries.getTask;

        const result = await query.run({ id: taskId });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully retrieved task <${taskId}> from database`);

        return this.modelConverter.toDataTransfer(result.data.record);
    }

    async createTask(task: TaskData): Promise<RecordId> {
        const query = this.database.queries.createTask;

        const result = await query.run({
            record: this.dataConverter.toDatabaseRecord(task)
        });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully created task <${result.data.id}>`);

        return { id: result.data.id };
    }

    async deleteTask(taskId: string): Promise<void> {
        const query = this.database.queries.deleteTask;

        const result = await query.run({ id: taskId });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully deleted task <${taskId}> from database`);
    }

    async updateTask(task: TaskModel): Promise<void> {
        const query = this.database.queries.updateTask;

        const result = await query.run({
            record: this.modelConverter.toDatabaseRecord(task)
        });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully updated task <${task.id}>`);
    }
}
