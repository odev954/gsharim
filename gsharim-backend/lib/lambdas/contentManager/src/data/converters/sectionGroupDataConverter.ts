import {
    IConverter,
    DataTypes,
    SectionGroupData,
    SectionGroupRecord
} from '@eco8200/backend-common';

export default class SectionGroupDataConverter
    implements IConverter<SectionGroupRecord, SectionGroupData>
{
    toDataTransfer(source: SectionGroupRecord): SectionGroupData {
        return {
            layout: source.layout,
            sectionIds: source.sectionIds
        };
    }

    toDatabaseRecord(source: SectionGroupData): SectionGroupRecord {
        return {
            id: null,
            sectionIds: source.sectionIds,
            layout: source.layout,
            type: DataTypes.SectionGroup,
            created_at: null,
            updated_at: null
        };
    }
}
