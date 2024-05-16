import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { TaskService } from '@services/taskService';
import { Task, TaskMetadata } from '@eco8200/data-models';

@Controller()
export class TaskController {
    @Inject(TaskService)
    private readonly service: TaskService;

    constructor(service: TaskService) {
        this.service = service;
    }

    @Get('/tasks')
    async getFilteredTasks(
        @Query('lessonId') lessonId: string
    ): Promise<TaskMetadata[]> {
        return this.service.filterTasks(lessonId);
    }

    @Get('/task/:id')
    async getTask(@Param('id') id: string): Promise<Task> {
        return await this.service.getTask(id);
    }
}
