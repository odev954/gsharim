export interface IConverter<TRecord, TData> {
	toDataTransfer(source: TRecord): TData;
	toDatabaseRecord(source: TData): TRecord;
}

export interface IAsyncConverter<TRecord, TData> {
	toDataTransfer(source: TRecord): Promise<TData>;
	toDatabaseRecord(source: TData): Promise<TRecord>;
}
