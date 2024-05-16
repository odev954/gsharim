import { Test, TestingModule } from '@nestjs/testing';
import consts from '../src/consts';
import { AppModule } from '../src/module';
import ContentManagerCommunicatorMock from './mocks/ContentComunicatorMock';
import SectionCommunicatorMock from './mocks/SectionCommunicatorMock';
import { TaskService } from '../src/services/taskService';
import {
    notFoundErrorMock,
    sectionGroupMocks,
    sectionMocks,
    taskMocks
} from './mocks/mocks';
import { omit } from 'lodash';
import { TaskState } from '@eco8200/data-models';
import lodash from 'lodash';
import { HttpException } from '@nestjs/common';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Testing AppService of task provider', () => {
    let service: TaskService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(consts.contentManagerInjectToken)
            .useClass(ContentManagerCommunicatorMock)
            .overrideProvider(consts.sectionManagerInjectToken)
            .useClass(SectionCommunicatorMock)
            .compile();

        service = module.get<TaskService>(TaskService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('fetching an existing task', async () => {
        const taskId = '620fe8cb-38c0-4984-b0e0-e0e3cf047489';
        const wantedTask = {
            metadata: {
                ...lodash.omit(taskMocks[taskId], [
                    'sectionGroupId',
                    'numberInSeries',
                    'lessonId'
                ]),
                status:  {state: TaskState.Todo, completedSections: []}
            },
            ...lodash.omit(
                sectionGroupMocks[taskMocks[taskId].sectionGroupId],
                ['id', 'sectionIds']
            ),
            sections: sectionGroupMocks[
                taskMocks[taskId].sectionGroupId
            ].sectionIds.map((id) => sectionMocks[id])
        };

        expect(await service.getTask(taskId)).toStrictEqual(wantedTask);
    });

    it('fetching a non-existing task, returns HTTP 404 error', async () => {
        const taskId = 'gibrish_id';
        const wantedException = new HttpException(
            notFoundErrorMock.response.data,
            notFoundErrorMock.response.status
        );

        try {
            await service.getTask(taskId);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect((error as HttpException).getStatus()).toEqual(
                wantedException.getStatus()
            );
            expect((error as HttpException).message).toEqual(
                wantedException.message
            );
        }

        expect(false);
    });

    it('fetching tasks by lesson id', async () => {
        const wantedLesson = '27b3887a-6d68-4e89-a4f8-4c5c7f697062';
        const wantedTasks = Object.values(taskMocks)
            .filter((task) => task.lessonId === wantedLesson)
            .sort(
                (current, next) => current.numberInSeries - next.numberInSeries
            )
            .map((task) => ({
                ...lodash.omit(task, [
                    'sectionGroupId',
                    'numberInSeries',
                    'lessonId'
                ]),
                status: {state: TaskState.Todo, completedSections: []}
            }));

        expect(await service.filterTasks(wantedLesson)).toStrictEqual(
            wantedTasks
        );
    });

    it('fetching tasks by undefined lesson id, returning all tasks', async () => {
        const wantedTasks = Object.values(taskMocks)
            .sort(
                (current, next) => current.numberInSeries - next.numberInSeries
            )
            .map((task) => ({
                ...lodash.omit(task, [
                    'sectionGroupId',
                    'numberInSeries',
                    'lessonId'
                ]),
                status: {state: TaskState.Todo, completedSections: []}
            }));

        expect(await service.filterTasks()).toStrictEqual(wantedTasks);
    });

    it('fetching tasks by non-existing lesson id, returning empty array', async () => {
        const wantedLesson = 'gibrish_id';

        expect(await service.filterTasks(wantedLesson)).toStrictEqual([]);
    });
});
