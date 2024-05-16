import React, { useMemo } from "react";
import { Box, Divider, Skeleton, Tab } from "@mui/material";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Gallery from "components/galleryDisplay";
import { uniq } from "lodash-es";
import { useTranslation } from "react-i18next";
import { skeletionIds } from "./consts";
import * as styles from "./styles";
import { ariaLabel } from "./strings";

interface TabsGalleryComponentCommonProps {
	currTab: string | null;
	handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
	itemsMappingByTabs: { [key: string]: JSX.Element[] };
	noItemsMessage: string;
}

export function TabsGalleryComponent({
	currTab,
	handleTabChange,
	itemsMappingByTabs,
	noItemsMessage,
}: TabsGalleryComponentCommonProps): JSX.Element {
	const { t: translate, i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);
	const tabNames = useMemo(() => {
		return Object.keys(itemsMappingByTabs);
	}, [itemsMappingByTabs]);

	if (!currTab) {
		return (
			<Box sx={styles.tabsGalleryContainer}>
				<Box height="max-height" display="inline-flex">
					{skeletionIds.slice(0, 3).map((value) => (
						<Skeleton variant="rounded" sx={styles.skeletonTabs} key={value} />
					))}
				</Box>
				<Divider sx={{ mb: 1, width: 50 }} />
				<Box height="max-height" display="inline-flex">
					{skeletionIds.map((value) => (
						<Skeleton variant="rounded" sx={styles.skeletonItems} key={value} />
					))}
				</Box>
			</Box>
		);
	}

	return (
		<Box sx={styles.tabsGalleryContainer}>
			<TabContext value={currTab}>
				<Box sx={styles.categoriesWrapper}>
					<TabList
						indicatorColor="secondary"
						textColor="secondary"
						sx={styles.tab}
						onChange={handleTabChange}
						aria-label={translate(ariaLabel)}
					>
						{uniq(tabNames).map((tabName: string) => {
							return (
								<Tab
									sx={styles.tab}
									disableRipple
									label={translate(tabName)}
									value={tabName}
									key={tabName}
								/>
							);
						})}
					</TabList>
				</Box>
				{uniq(tabNames).map((tabName: string) => {
					const items = itemsMappingByTabs[tabName];
					return (
						<TabPanel
							sx={styles.unScrollableItemsContainer}
							value={tabName}
							key={translate(tabName)}
						>
							<Gallery noItemsMessage={noItemsMessage} direction={dir}>
								{items}
							</Gallery>
						</TabPanel>
					);
				})}
			</TabContext>
		</Box>
	);
}
