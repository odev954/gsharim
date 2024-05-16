import React, { useCallback, useEffect, useState } from "react";
import { get, keys } from "lodash-es";
import { TabsGalleryComponent } from "./tabsGalleryComponent";

export interface TabsGalleryContainerProps {
	itemsMappingByTabs: { [key: string]: JSX.Element[] };
	noItemsMessage: string;
}

export function TabsGalleryContainer({
	itemsMappingByTabs,
	noItemsMessage,
}: TabsGalleryContainerProps): JSX.Element {
	const [currTab, setCurrTab] = useState<string | null>(null);

	useEffect(() => {
		if (!currTab) {
			const defaultTab = get(keys(itemsMappingByTabs), 0);
			setCurrTab(defaultTab);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemsMappingByTabs]);

	const handleTabChange = useCallback(
		(_event: React.SyntheticEvent, tab: string): void => {
			setCurrTab(tab);
		},
		[]
	);

	return (
		<TabsGalleryComponent
			handleTabChange={handleTabChange}
			currTab={currTab}
			itemsMappingByTabs={itemsMappingByTabs}
			noItemsMessage={noItemsMessage}
		/>
	);
}
