import { Test, TestingModule } from '@nestjs/testing';
import { consts } from '../src/consts';
import { TaskCrudService } from '../src/services/taskCrudService';
import { AppModule } from '../src/module';
import { ContentDatabaseMock } from './mocks/tasks/contentDatabaseMock';
import { taskMocks } from './mocks/tasks/taskMocks';
import lodash from 'lodash';
import { TaskModel } from '@eco8200/backend-common';
import { TaskType } from '@eco8200/data-models';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Testing TaskCrudService of content manager', () => {
    let service: TaskCrudService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(consts.TasksDatabaseInjectToken)
            .useClass(ContentDatabaseMock)
            .compile();

        service = module.get<TaskCrudService>(TaskCrudService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('fetch an existing task', async () => {
        const taskId = '620fe8cb-38c0-4984-b0e0-e0e3cf047489';
        const wantedTask = lodash.omit(taskMocks[taskId], [
            'type',
            'created_at',
            'updated_at'
        ]);

        expect(await service.getTask(taskId)).toStrictEqual(wantedTask);
    });

    it('fetch a non-existing task, throwing HTTP 404 error', async () => {
        const taskId = 'gibrish_id';

        await expect(service.getTask(taskId)).rejects.toThrow(
            NotFoundException
        );
    });

    it('delete an existing task', async () => {
        const taskId = '620fe8cb-38c0-4984-b0e0-e0e3cf047489';

        await expect(service.deleteTask(taskId)).resolves;
    });

    it('deleting a non-existing task, throwing HTTP 404 error', async () => {
        const taskId = 'gibrish_id';

        await expect(service.deleteTask(taskId)).rejects.toThrow(
            NotFoundException
        );
    });

    it('update an existing task', async () => {
        const taskId = '620fe8cb-38c0-4984-b0e0-e0e3cf047489';
        const updatedTask = lodash.omit(taskMocks[taskId], [
            'type',
            'created_at',
            'updated_at'
        ]);

        updatedTask.name = 'updatedTaskName';

        await expect(service.updateTask(updatedTask as TaskModel)).resolves;
    });

    it('updating a non-existing task, throwing HTTP 404 error', async () => {
        const nonExistentTaskId = 'gibrish_id';
        const taskId = '620fe8cb-38c0-4984-b0e0-e0e3cf047489';
        const updatedTask = lodash.omit(taskMocks[taskId], [
            'type',
            'created_at',
            'updated_at'
        ]);

        updatedTask.name = 'updatedTaskName';
        updatedTask.id = nonExistentTaskId;

        await expect(
            service.updateTask(updatedTask as TaskModel)
        ).rejects.toThrow(NotFoundException);
    });

    it('create a new task', async () => {
        const newTask = {
            variant: TaskType.Exercise,
            lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
            name: 'new test',
            description: 'this is a new test',
            sectionGroupId: '04f222f3-032b-476e-b2b7-9742f45c633e',
            numberInSeries: 0
        };

        expect(await service.createTask(newTask)).toStrictEqual({
            id: '38aa16ea-69b5-4d2e-abb0-8d512094b430'
        });
    });

    it('filter tasks by lesson id', async () => {
        const wantedLesson = '27b3887a-6d68-4e89-a4f8-4c5c7f697062';
        const wantedTasks = Object.values(taskMocks)
            .filter((task) => task.lessonId === wantedLesson)
            .map((task) =>
                lodash.omit(task, ['type', 'created_at', 'updated_at'])
            );

        expect(await service.filterTasks(wantedLesson)).toStrictEqual(
            wantedTasks
        );
    });

    it('filter tasks without a defined lesson id, returns all tasks', async () => {
        const wantedTasks = Object.values(taskMocks).map((task) =>
            lodash.omit(task, ['type', 'created_at', 'updated_at'])
        );

        expect(await service.filterTasks()).toStrictEqual(wantedTasks);
    });

    it('fetching tasks by non-existing lesson id, returning empty array', async () => {
        const wantedLesson = 'gibrish_id';

        expect(await service.filterTasks(wantedLesson)).toStrictEqual([]);
    });
});
