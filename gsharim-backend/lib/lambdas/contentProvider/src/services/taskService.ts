import { Task, TaskMetadata, TaskState } from '@eco8200/data-models';
import { Inject, Injectable } from '@nestjs/common';
import consts from '../consts';
import {
    IContentManagerCommunicator,
    ISectionManagerCommunicator
} from '@abstract/index';
import { buildHttpError } from '@eco8200/backend-common';

@Injectable()
export class TaskService {
    constructor(
        @Inject(consts.contentManagerInjectToken)
        private readonly contentManager: IContentManagerCommunicator,
        @Inject(consts.sectionManagerInjectToken)
        private readonly sectionManager: ISectionManagerCommunicator
    ) {}

    async getTask(taskId: string): Promise<Task> {
        const taskQuery = this.contentManager.queries.getTask;
        const sectionQuery = this.sectionManager.queries.getSectionGroup;

        const taskQueryResult = await taskQuery.run({ taskId });

        if (!taskQueryResult.success) {
            throw buildHttpError(taskQueryResult.error);
        }
        const { task } = taskQueryResult.data;
        console.info(`fetched task <${task.id}>`);

        const sectionGroupQueryResult = await sectionQuery.run({
            sectionGroupId: task.sectionGroupId
        });

        if (!sectionGroupQueryResult.success) {
            throw buildHttpError(sectionGroupQueryResult.error);
        }

        const { sectionGroup } = sectionGroupQueryResult.data;
        console.info(`fetched section group <${sectionGroup.id}>`);

        console.info(`built task <${task.id}> successfully`);
        return {
            metadata: {
                id: task.id,
                variant: task.variant,
                name: task.name,
                description: task.description,
                status: {state: TaskState.Todo, completedSections: []}
            },
            layout: sectionGroup.layout,
            sections: sectionGroup.sections
        };
    }

    async filterTasks(lessonId?: string): Promise<TaskMetadata[]> {
        const query = this.contentManager.queries.filterTasks;
        const response = await query.run({ lessonId });

        if (!response.success) {
            throw buildHttpError(response.error);
        }

        const { tasks } = response.data;
        console.info(`fetched tasks of lesson <${lessonId}>`);

        return tasks
            .sort(
                (current, next) => current.numberInSeries - next.numberInSeries
            )
            .map((task) => ({
                id: task.id,
                variant: task.variant,
                name: task.name,
                description: task.description,
                status:  {state: TaskState.Todo, completedSections: []}
            }));
    }
}
