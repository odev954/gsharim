import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { TaskCrudService } from '@services/taskCrudService';
import {
    TaskData,
    RecordId,
    TaskModel,
    TaskModelSchema,
    parsePayload,
    TaskDataSchema
} from '@eco8200/backend-common';

@Controller()
export class TasksController {
    @Inject(TaskCrudService)
    private readonly taskService: TaskCrudService;

    constructor(service: TaskCrudService) {
        this.taskService = service;
    }

    @Get('/tasks/')
    async getFilteredTasks(
        @Query('lessonId') lessonId: string
    ): Promise<TaskModel[]> {
        return this.taskService.filterTasks(lessonId);
    }

    @Get('/tasks/:id')
    async getTask(@Param('id') id: string): Promise<TaskModel> {
        return await this.taskService.getTask(id);
    }

    @Post('/tasks')
    async createTask(@Body() payload: TaskData): Promise<RecordId> {
        console.info(`parsing payload...`);
        const task = parsePayload(TaskDataSchema, payload);
        console.info(`payload parsed successfully`);
        return await this.taskService.createTask(task);
    }

    @Delete('/tasks/:id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        return await this.taskService.deleteTask(id);
    }

    @Put('/tasks/')
    async updateTask(@Body() payload: TaskModel): Promise<void> {
        console.info(`parsing payload...`);
        const task = parsePayload(TaskModelSchema, payload);
        console.info(`payload parsed successfully`);
        return await this.taskService.updateTask(task);
    }
}
