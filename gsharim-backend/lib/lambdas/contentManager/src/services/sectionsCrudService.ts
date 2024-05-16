import { ISectionData } from '@eco8200/data-models';
import { Inject, Injectable } from '@nestjs/common';
import SectionConverter from '@converters/sectionConverter';
import ISectionsDatabase from '@abstract/sectionsDatabase';
import { consts } from '@consts';
import ISectionsGroupDatabase from '@abstract/sectionsGroupDatabase';
import {
    RecordId,
    ExecutionResult,
    SectionGroupData,
    SectionGroupModel,
    buildHttpError
} from '@eco8200/backend-common';
import SectionGroupModelConverter from '@converters/sectionGroupModelCoverter';
import lodash from 'lodash';
import SectionGroupDataConverter from '@converters/sectionGroupDataConverter';

@Injectable()
export class SectionsCrudService {
    private readonly sectionConverter = new SectionConverter();
    private readonly groupDataConverter = new SectionGroupDataConverter();
    private readonly groupModelConverter = new SectionGroupModelConverter();

    constructor(
        @Inject(consts.SectionsDatabaseInjectToken)
        private readonly sectionsDatabase: ISectionsDatabase,
        @Inject(consts.SectionsGroupDatabaseInjectToken)
        private readonly groupDatabase: ISectionsGroupDatabase
    ) { }

    async getSection(id: string): Promise<ISectionData> {
        const query = this.sectionsDatabase.queries.getSection;

        const result = await query.run({ id: id });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(
            `successfully retrieved section <${result.data.record.id}> from database`
        );
        return this.sectionConverter.toDataTransfer(result.data.record);
    }

    async createSection(section: ISectionData): Promise<RecordId> {
        const query = this.sectionsDatabase.queries.createSection;

        const result = await query.run({
            record: this.sectionConverter.toDatabaseRecord(section)
        });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully created section <${result.data.id}>`);

        return { id: result.data.id };
    }

    async deleteSection(id: string): Promise<void> {
        const deleteQuery = this.sectionsDatabase.queries.deleteSection;
        const groupUpdateQuery = this.groupDatabase.queries.updateGroup;
        const groupDeleteQuery = this.groupDatabase.queries.deleteGroup;
        const getGroupsBySectionQuery =
            this.groupDatabase.queries.getGroupsWithSection;

        const result = await deleteQuery.run({ id: id });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully deleted section <${id}> from database`);

        const groups = await getGroupsBySectionQuery.run({ id: id });

        if (!groups.success) {
            throw await buildHttpError(groups.error);
        }

        console.info(`fetched all groups containing section <${id}>`);
        console.info(`removing section <${id}> from groups...`);

        lodash.forEach(groups.data.records, async (group) => {
            let result: ExecutionResult<Error> = null;

            group.sectionIds = group.sectionIds.filter(
                (sectionId) => sectionId !== id
            );
            console.info(`removed section <${id}> from group <${group.id}>`);

            if (group.sectionIds.length > 0) {
                result = await groupUpdateQuery.run({
                    record: group
                });
            } else {
                result = await groupDeleteQuery.run({
                    id: group.id
                });
            }

            if (!result.success) {
                throw buildHttpError(result.error);
            }

            console.info(
                group.sectionIds.length > 0
                    ? `successfully updated group <${group.id}>`
                    : `successfully removed empty group <${group.id}>`
            );
        });
    }

    async updateSection(section: ISectionData): Promise<void> {
        const query = this.sectionsDatabase.queries.updateSection;

        const result = await query.run({
            record: this.sectionConverter.toDatabaseRecord(section)
        });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully updated section <${section.id}>`);
    }

    async getSectionGroup(id: string): Promise<SectionGroupModel> {
        const query = this.groupDatabase.queries.getGroup;

        const result = await query.run({ id: id });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(
            `successfully retrieved section group <${id}> from database`
        );

        const group = this.groupModelConverter.toDataTransfer(
            result.data.record
        );

        group.sections = await Promise.all(
            result.data.record.sectionIds.map((id) => this.getSection(id))
        );

        console.info(
            `successfully retrieved all sections contained in group <${id}> from database`
        );

        return group;
    }

    async createSectionGroup(group: SectionGroupData): Promise<RecordId> {
        const query = this.groupDatabase.queries.createGroup;

        const result = await query.run({
            record: this.groupDataConverter.toDatabaseRecord(group)
        });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(`successfully created section group <${result.data.id}>`);

        return { id: result.data.id };
    }

    async deleteSectionGroup(id: string): Promise<void> {
        const query = this.groupDatabase.queries.deleteGroup;

        const result = await query.run({ id: id });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(
            `successfully deleted section group <${id}> from database`
        );
    }

    async updateSectionGroup(
        groupId: string,
        groupData: SectionGroupData
    ): Promise<void> {
        const query = this.groupDatabase.queries.updateGroup;
        const groupRecord = this.groupDataConverter.toDatabaseRecord(groupData);

        groupRecord.id = groupId;
        const result = await query.run({
            record: groupRecord
        });

        if (!result.success) {
            throw buildHttpError(result.error);
        }

        console.info(
            `successfully updated section group <${groupId}> from database`
        );
    }
}
