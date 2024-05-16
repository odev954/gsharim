import { LayoutType, SectionType, TaskType } from '@eco8200/data-models';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const notFoundErrorMock = new AxiosError(
    'Not Found',
    '404',
    {} as InternalAxiosRequestConfig,
    {},
    {
        data: { errors: [{ detail: 'this is a mocked error' }] },
        status: 404,
        statusText: 'Resource not found',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }
);

export const taskMocks = {
    '620fe8cb-38c0-4984-b0e0-e0e3cf047489': {
        id: '620fe8cb-38c0-4984-b0e0-e0e3cf047489',
        variant: TaskType.Exercise,
        lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
        name: 'test 1',
        description: 'this is a test 1',
        sectionGroupId: 'ed4398f5-3e03-47a7-8290-81c71d458dc6',
        numberInSeries: 0
    },
    'd457c0f9-41ff-45f3-9966-54819607f282': {
        id: 'd457c0f9-41ff-45f3-9966-54819607f282',
        variant: TaskType.Exercise,
        lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
        name: 'test 2',
        description: 'this is a test 2',
        sectionGroupId: 'ed4398f5-3e03-47a7-8290-81c71d458dc6',
        numberInSeries: 1
    },
    '3284e9b9-1e68-4ee9-962c-a7e76232c008': {
        id: '3284e9b9-1e68-4ee9-962c-a7e76232c008',
        variant: TaskType.Exercise,
        lessonId: '27b3887a-6d68-4e89-a4f8-4c5c7f697062',
        name: 'test 3',
        description: 'this is a test 3',
        sectionGroupId: 'ed4398f5-3e03-47a7-8290-81c71d458dc6',
        numberInSeries: 2
    },
    '0d76f3d4-be70-4b39-94f9-e971e8bd513e': {
        id: '0d76f3d4-be70-4b39-94f9-e971e8bd513e',
        variant: TaskType.Exercise,
        lessonId: '0afc1775-8b27-46df-99a2-384e30749920',
        name: 'test 4',
        description: 'this is a test 4',
        sectionGroupId: 'ed4398f5-3e03-47a7-8290-81c71d458dc6',
        numberInSeries: 3
    }
};

export const sectionMocks = {
    'bc65abd2-e051-457c-b171-c2ec8103b40a': {
        id: 'bc65abd2-e051-457c-b171-c2ec8103b40a',
        variant: SectionType.Slide,
        googleSlideId: '1mEoNZutGMLYrkdWJoiTAduaMPd1eCI3N',
        slideStartIndex: 0,
        options: { showControls: false }
    },
    'bd0491e8-74ad-415c-ad30-991a2de4f933': {
        id: 'bd0491e8-74ad-415c-ad30-991a2de4f933',
        variant: SectionType.Ide,
        language: 'python',
        defaultCode: 'print(4 * 2)'
    }
};

export const sectionGroupMocks = {
    'ed4398f5-3e03-47a7-8290-81c71d458dc6': {
        id: 'ed4398f5-3e03-47a7-8290-81c71d458dc6',
        sectionIds: [
            'bc65abd2-e051-457c-b171-c2ec8103b40a',
            'bd0491e8-74ad-415c-ad30-991a2de4f933'
        ],
        layout: {
            layoutType: LayoutType.HorizontalSplit
        }
    }
};
