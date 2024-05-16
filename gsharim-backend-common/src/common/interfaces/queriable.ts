import IQuery, { IUnsafeQuery } from "./query";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IQueryResponse {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IQueryParameters {}

export type QueryMap<TQueryIndex extends string | number | symbol> = {
	[Query in TQueryIndex]?:
		| IQuery<Error, IQueryParameters, IQueryResponse>
		| IQuery<Error, IQueryParameters>
		| IQuery<Error>
		| IUnsafeQuery<IQueryParameters, IQueryResponse>
		| IUnsafeQuery<IQueryParameters>
		| IUnsafeQuery;
};

export default interface IQueriable<
	TQueryIndex extends string | number | symbol
> {
	queries: QueryMap<TQueryIndex>;
}
