import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Inject
} from '@nestjs/common';
import { SectionsCrudService } from '@services/sectionsCrudService';
import { ISectionData, ISectionDataSchema } from '@eco8200/data-models';
import {
    RecordId,
    SectionGroupDataSchema,
    parsePayload,
    SectionGroupData,
    SectionGroupModel
} from '@eco8200/backend-common';

@Controller()
export class SectionsController {
    @Inject(SectionsCrudService)
    private readonly appService: SectionsCrudService;

    constructor(service: SectionsCrudService) {
        this.appService = service;
    }

    @Get('/sections/:id')
    async getSection(@Param('id') id: string): Promise<ISectionData> {
        return await this.appService.getSection(id);
    }

    @Post('/sections')
    async createSection(@Body() payload: ISectionData): Promise<RecordId> {
        console.info(`parsing payload...`);
        const section = parsePayload(ISectionDataSchema, payload);
        console.info(`payload parsed successfully`);
        return await this.appService.createSection(section);
    }

    @Delete('/sections/:id')
    async deleteSection(@Param('id') id: string): Promise<void> {
        return await this.appService.deleteSection(id);
    }

    @Put('/sections/')
    async updateSection(@Body() payload: ISectionData): Promise<void> {
        console.info(`parsing payload...`);
        const section = parsePayload(ISectionDataSchema, payload);
        console.info(`payload parsed successfully`);
        return await this.appService.updateSection(section);
    }

    @Get('/sections/groups/:id')
    async getSectionGroup(@Param('id') id: string): Promise<SectionGroupModel> {
        return await this.appService.getSectionGroup(id);
    }

    @Post('/sections/groups/')
    async createSectionGroup(
        @Body() payload: SectionGroupData
    ): Promise<RecordId> {
        console.info(`parsing payload...`);
        const group = parsePayload(SectionGroupDataSchema, payload);
        console.info(`payload parsed successfully`);
        return await this.appService.createSectionGroup(group);
    }

    @Delete('/sections/groups/:id')
    async deleteSectionGroup(@Param('id') id: string): Promise<void> {
        return await this.appService.deleteSectionGroup(id);
    }

    @Put('/sections/groups/:id')
    async updateSectionGroup(
        @Param('id') id: string,
        @Body() payload: SectionGroupData
    ): Promise<void> {
        console.info(`parsing payload...`);
        const group = parsePayload(SectionGroupDataSchema, payload);
        console.info(`payload parsed successfully`);
        return await this.appService.updateSectionGroup(id, group);
    }
}
