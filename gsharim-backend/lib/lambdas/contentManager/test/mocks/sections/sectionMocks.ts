import { DataTypes } from '@eco8200/backend-common';
import { LayoutType, SectionType } from '@eco8200/data-models';

export const sectionMocks = {
    'bc65abd2-e051-457c-b171-c2ec8103b40a': {
        id: 'bc65abd2-e051-457c-b171-c2ec8103b40a',
        type: 'Section' as DataTypes,
        variant: SectionType.Slide,
        googleSlideId: '1mEoNZutGMLYrkdWJoiTAduaMPd1eCI3N',
        slideStartIndex: 0,
        options: { showControls: false },
        updated_at: 0,
        created_at: 0
    },
    'bd0491e8-74ad-415c-ad30-991a2de4f933': {
        id: 'bd0491e8-74ad-415c-ad30-991a2de4f933',
        variant: SectionType.Ide,
        language: 'python',
        defaultCode: 'print(4 * 2)',
        updated_at: 0,
        created_at: 0
    }
};

export const sectionGroupMocks = {
    'ed4398f5-3e03-47a7-8290-81c71d458dc6': {
        id: 'ed4398f5-3e03-47a7-8290-81c71d458dc6',
        type: 'SectionGroup' as DataTypes,
        sectionIds: [
            'bc65abd2-e051-457c-b171-c2ec8103b40a',
            'bd0491e8-74ad-415c-ad30-991a2de4f933'
        ],
        layout: {
            layoutType: LayoutType.HorizontalSplit
        }
    }
};
