export type KeyedBy<T, S extends PropertyKey> = S extends keyof T
	? {
			[K in T[S] as Extends<K, PropertyKey>]: Extends<T, Record<S, K>>;
	  }
	: never;

type Extends<T1, T2> = T1 extends T2 ? T1 : never;
