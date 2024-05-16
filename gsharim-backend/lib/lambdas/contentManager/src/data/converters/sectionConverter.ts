import { ISectionData, ISectionDataSchema } from '@eco8200/data-models';
import { IConverter, IRecord, DataTypes } from '@eco8200/backend-common';
import lodash from 'lodash';

export default class SectionConverter
    implements IConverter<IRecord, ISectionData>
{
    toDataTransfer(source: IRecord): ISectionData {
        const data = lodash.omit(source, ['type', 'created_at', 'updated_at']);
        return {
            ...ISectionDataSchema.parse(data)
        };
    }
    toDatabaseRecord(source: ISectionData): IRecord {
        return {
            ...source,
            type: DataTypes.Section,
            created_at: null,
            updated_at: null
        };
    }
}
