interface GalleryDisplayWithCategoriesProps {
	items: { [key: string]: JSX.Element[] };
	noCategories: false;
}

interface GalleryDisplayNoCategoriesProps {
	items: JSX.Element[];
	noCategories: true;
}

export type GalleryDisplayBasicProps =
	| GalleryDisplayNoCategoriesProps
	| GalleryDisplayWithCategoriesProps;
