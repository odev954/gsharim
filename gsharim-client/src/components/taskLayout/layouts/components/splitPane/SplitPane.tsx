import { SplitPane, SplitPaneProps } from "react-collapse-pane";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { horizontalStyles, verticalStyles } from "../../styles";

export default function LayoutSplitPane(
	splitPaneProps: SplitPaneProps
): JSX.Element {
	const [isDragging, setIsDragging] = useState(false);
	const { i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);
	const resizerStyles = useMemo(
		() =>
			splitPaneProps.split === "vertical"
				? verticalStyles(isDragging)
				: horizontalStyles(isDragging),
		[splitPaneProps.split, isDragging]
	);

	const splitPaneHooks = useMemo(() => {
		return {
			onDragStarted: () => {
				setIsDragging(true);
			},
			onSaveSizes: () => {
				setIsDragging(false);
			},
		};
	}, []);

	return (
		<SplitPane
			resizerOptions={{
				css: isDragging ? resizerStyles : {},
				hoverCss: resizerStyles,
			}}
			hooks={splitPaneHooks}
			dir={dir}
			{...splitPaneProps}
		/>
	);
}
