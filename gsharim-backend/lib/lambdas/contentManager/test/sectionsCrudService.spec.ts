import { Test, TestingModule } from '@nestjs/testing';
import { consts } from '../src/consts';
import { AppModule } from '../src/module';
import { sectionGroupMocks, sectionMocks } from './mocks/sections/sectionMocks';
import lodash from 'lodash';
import { SectionsCrudService } from '../src/services/sectionsCrudService';
import { SectionsGroupDatabaseMock } from './mocks/sections/sectionGroupsDatabaseMock';
import { SectionsDatabaseMock } from './mocks/sections/sectionsDatabaseMock';
import { NotFoundException } from '@nestjs/common';
import { LayoutType, SectionType } from '@eco8200/data-models';
import { DataTypes, SectionGroupData } from '@eco8200/backend-common';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Testing SectionCrudService of sections manager', () => {
    let service: SectionsCrudService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(consts.SectionsGroupDatabaseInjectToken)
            .useClass(SectionsGroupDatabaseMock)
            .overrideProvider(consts.SectionsDatabaseInjectToken)
            .useClass(SectionsDatabaseMock)
            .compile();

        service = module.get<SectionsCrudService>(SectionsCrudService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('fetch an existing section', async () => {
        const sectionId = 'bc65abd2-e051-457c-b171-c2ec8103b40a';
        const wantedSection = lodash.omit(sectionMocks[sectionId], [
            'type',
            'created_at',
            'updated_at'
        ]);

        expect(await service.getSection(sectionId)).toStrictEqual(
            wantedSection
        );
    });

    it('fetch a non-existing section, throwing HTTP 404 error', async () => {
        const sectionId = 'gibrish_id';

        await expect(service.getSection(sectionId)).rejects.toThrow(
            NotFoundException
        );
    });

    it('delete an existing section', async () => {
        const sectionId = 'bc65abd2-e051-457c-b171-c2ec8103b40a';

        await expect(service.deleteSection(sectionId)).resolves;
    });

    it('deleting a non-existing section, throwing HTTP 404 error', async () => {
        const sectionId = 'gibrish_id';

        await expect(service.deleteSection(sectionId)).rejects.toThrow(
            NotFoundException
        );
    });

    it('update an existing section', async () => {
        const sectionId = 'bc65abd2-e051-457c-b171-c2ec8103b40a';
        const updatedSection = lodash.omit(sectionMocks[sectionId], [
            'type',
            'created_at',
            'updated_at'
        ]);

        updatedSection.slideStartIndex = 6;

        await expect(service.updateSection(updatedSection)).resolves;
    });

    it('updating a non-existing section, throwing HTTP 404 error', async () => {
        const nonExistentSectionId = 'gibrish_id';
        const sectionId = 'bc65abd2-e051-457c-b171-c2ec8103b40a';
        const updatedSection = lodash.omit(sectionMocks[sectionId], [
            'type',
            'created_at',
            'updated_at'
        ]);

        updatedSection.slideStartIndex = 6;
        updatedSection.id = nonExistentSectionId;

        await expect(service.updateSection(updatedSection)).rejects.toThrow(
            NotFoundException
        );
    });

    it('create a new section', async () => {
        const newSection = {
            id: '',
            variant: SectionType.Slide,
            googleSlideId: '1mEoNZutGMLYrkdWJoiTAduaMPd1eCI3N',
            slideStartIndex: 0,
            options: { showControls: false }
        };

        expect(await service.createSection(newSection)).toStrictEqual({
            id: '38aa16ea-69b5-4d2e-abb0-8d512094b430'
        });
    });

    it('fetch an existing section group', async () => {
        const sectionGroupId = 'ed4398f5-3e03-47a7-8290-81c71d458dc6';
        const sectionGroupRecord = lodash.omit(
            sectionGroupMocks[sectionGroupId],
            ['type', 'created_at', 'updated_at']
        );

        const wantedSectionGroup = {
            id: sectionGroupRecord.id,
            layout: sectionGroupRecord.layout,
            sections: sectionGroupRecord.sectionIds.map((sectionId) =>
                lodash.omit(sectionMocks[sectionId], [
                    'type',
                    'created_at',
                    'updated_at'
                ])
            )
        };

        expect(await service.getSectionGroup(sectionGroupId)).toStrictEqual(
            wantedSectionGroup
        );
    });

    it('fetch a non-existing section group, throwing HTTP 404 error', async () => {
        const sectionGroupId = 'gibrish_id';

        await expect(service.getSectionGroup(sectionGroupId)).rejects.toThrow(
            NotFoundException
        );
    });

    it('delete an existing section group', async () => {
        const sectionGroupId = 'ed4398f5-3e03-47a7-8290-81c71d458dc6';

        await expect(service.deleteSectionGroup(sectionGroupId)).resolves;
    });

    it('deleting a non-existing section group, throwing HTTP 404 error', async () => {
        const sectionGroupId = 'gibrish_id';

        await expect(
            service.deleteSectionGroup(sectionGroupId)
        ).rejects.toThrow(NotFoundException);
    });

    it('update an existing section group', async () => {
        const sectionGroupId = 'ed4398f5-3e03-47a7-8290-81c71d458dc6';
        const updatedSectionGroup = lodash.omit(
            sectionGroupMocks[sectionGroupId],
            ['id', 'type', 'created_at', 'updated_at']
        );

        updatedSectionGroup.layout = { layoutType: LayoutType.SingleSection };

        await expect(
            service.updateSectionGroup(
                sectionGroupId,
                updatedSectionGroup as SectionGroupData
            )
        ).resolves;
    });

    it('updating a non-existing section group, throwing HTTP 404 error', async () => {
        const nonExistentSectionId = 'gibrish_id';
        const sectionGroupId = 'ed4398f5-3e03-47a7-8290-81c71d458dc6';
        const updatedSectionGroup = lodash.omit(
            sectionGroupMocks[sectionGroupId],
            ['id', 'type', 'created_at', 'updated_at']
        );

        updatedSectionGroup.layout = { layoutType: LayoutType.SingleSection };

        await expect(
            service.updateSectionGroup(
                nonExistentSectionId,
                updatedSectionGroup as SectionGroupData
            )
        ).rejects.toThrow(NotFoundException);
    });

    it('create a new section group', async () => {
        const newSectionGroup = {
            type: 'SectionGroup' as DataTypes,
            sectionIds: [
                'bc65abd2-e051-457c-b171-c2ec8103b40a',
                'bd0491e8-74ad-415c-ad30-991a2de4f933'
            ],
            layout: {
                layoutType: LayoutType.HorizontalSplit
            }
        };

        expect(await service.createSectionGroup(newSectionGroup)).toStrictEqual(
            {
                id: '38aa16ea-69b5-4d2e-abb0-8d512094b430'
            }
        );
    });
});
