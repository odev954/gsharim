export type OnNavigateCallbackFunction = (
	index: number,
	navigateType: NavigateType
) => void;

export type NavigateTypeInfo = NavigateType | undefined;
export type NavigateType = "task" | "lesson" | "chapter";

type NavigateWithCallback = (
	handleNewIndexCallback: OnNavigateCallbackFunction
) => void;

interface INaviagation {
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	goNext?: NavigateWithCallback;
	goPrevious?: NavigateWithCallback;
	goToFirst?: NavigateWithCallback;
	goToLast?: NavigateWithCallback;
	isFirst?: boolean;
	isLast?: boolean;
	currentIndex?: number;
	lastIndex?: number;
}

interface NavigationLoading extends INaviagation {
	isError: false;
	isLoading: true;
	isSuccess: false;
}

interface NavigationError extends INaviagation {
	isError: true;
	isLoading: false;
	isSuccess: false;
}

interface NavigationSuccess extends INaviagation {
	isError: false;
	isLoading: false;
	isSuccess: true;
	goNext: NavigateWithCallback;
	goPrevious: NavigateWithCallback;
	goToFirst: NavigateWithCallback;
	goToLast: NavigateWithCallback;
	isFirst: boolean;
	isLast: boolean;
	currentIndex: number;
	lastIndex: number;
}

export type Navigation =
	| NavigationLoading
	| NavigationError
	| NavigationSuccess;
