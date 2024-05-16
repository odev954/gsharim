import IdeApiHints from "../abstract/ideApiHints";

export default interface IdeConfiguration {
	api?: IdeApiHints;
	autoAwait?: boolean;
	defaultCode?: string;
	editable?: boolean;
	maxOutputSize?: number;
}
