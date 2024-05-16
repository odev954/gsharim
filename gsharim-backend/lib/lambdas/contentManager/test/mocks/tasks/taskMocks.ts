import { DataTypes, TaskRecord } from '@eco8200/backend-common';
import { TaskType } from '@eco8200/data-models';

type TaskMockMap = {
    [key: string]: TaskRecord;
};

export const taskMocks: TaskMockMap = {
    '620fe8cb-38c0-4984-b0e0-e0e3cf047489': {
        id: '620fe8cb-38c0-4984-b0e0-e0e3cf047489',
        type: 'Task' as DataTypes,
        variant: TaskType.Exercise,
        lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
        name: 'test 1',
        description: 'this is a test 1',
        sectionGroupId: '86fca860-c64c-4fab-a1ae-da5fde6d57ef',
        numberInSeries: 0,
        updated_at: 0,
        created_at: 0
    },
    'd457c0f9-41ff-45f3-9966-54819607f282': {
        id: 'd457c0f9-41ff-45f3-9966-54819607f282',
        type: 'Task' as DataTypes,
        variant: TaskType.Exercise,
        lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
        name: 'test 2',
        description: 'this is a test 2',
        sectionGroupId: 'da2ad030-83fc-430b-92bc-4d4c4dd955f3',
        numberInSeries: 0,
        updated_at: 0,
        created_at: 0
    },
    '3284e9b9-1e68-4ee9-962c-a7e76232c008': {
        id: '3284e9b9-1e68-4ee9-962c-a7e76232c008',
        type: 'Task' as DataTypes,
        variant: TaskType.Exercise,
        lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
        name: 'test 3',
        description: 'this is a test 3',
        sectionGroupId: '98e19606-3f86-4af1-8998-bbca4bf149f6',
        numberInSeries: 0,
        updated_at: 0,
        created_at: 0
    },
    '0d76f3d4-be70-4b39-94f9-e971e8bd513e': {
        id: '0d76f3d4-be70-4b39-94f9-e971e8bd513e',
        type: 'Task' as DataTypes,
        variant: TaskType.Exercise,
        lessonId: '0afc1775-8b27-46df-99a2-384e30749920',
        name: 'test 4',
        description: 'this is a test 4',
        sectionGroupId: '055be8b7-2179-4dbb-8fc2-80c16aab50d9',
        numberInSeries: 0,
        updated_at: 0,
        created_at: 0
    }
};
