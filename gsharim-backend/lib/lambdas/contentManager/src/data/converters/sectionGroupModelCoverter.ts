import {
    IConverter,
    DataTypes,
    SectionGroupModel,
    SectionGroupRecord
} from '@eco8200/backend-common';
import lodash from 'lodash';

export default class SectionGroupModelConverter
    implements IConverter<SectionGroupRecord, SectionGroupModel>
{
    toDataTransfer(source: SectionGroupRecord): SectionGroupModel {
        return {
            id: source.id,
            layout: source.layout,
            sections: []
        };
    }

    toDatabaseRecord(source: SectionGroupModel): SectionGroupRecord {
        return {
            id: source.id,
            sectionIds: lodash.map(source.sections, (section) => section.id),
            layout: source.layout,
            type: DataTypes.SectionGroup,
            created_at: null,
            updated_at: null
        };
    }
}
