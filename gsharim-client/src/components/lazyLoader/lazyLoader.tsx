import Loader from "components/loading";
import { Suspense } from "react";

function LazyLoader<T extends object>(
	WrappedComponent: (props: T) => JSX.Element,
	loader?: () => JSX.Element,
	isPage?: boolean
): (props: T) => JSX.Element {
	return function lazyComponent(props: T) {
		return (
			<Suspense fallback={<Loader LoaderComponent={loader} isPage={isPage} />}>
				<WrappedComponent {...props} />
			</Suspense>
		);
	};
}

export default LazyLoader;
