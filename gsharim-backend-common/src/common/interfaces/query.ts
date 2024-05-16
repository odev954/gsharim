export type ExecutionResult<TError extends Error, TData = never> =
	| {
			data: TData;
			success: true;
			error?: never;
	  }
	| {
			data?: never;
			success: true;
			error?: never;
	  }
	| {
			success: false;
			error: TError;
	  };

export default interface IQuery<
	TError extends Error,
	TParam = never,
	TResult = never
> {
	run(param?: TParam): Promise<ExecutionResult<TError, TResult>>;
}

export interface IUnsafeQuery<TParam = never, TResult = void> {
	run(param?: TParam): Promise<TResult>;
}
