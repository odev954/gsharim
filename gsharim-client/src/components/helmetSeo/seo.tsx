import { ReactNode, useCallback, useState } from "react";
import { Helmet, HelmetProps } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useIsMounted } from "usehooks-ts";
import * as strings from "./strings";
import { iconMetaContent } from "./consts";
import { ClientState } from "./types";
import { generateMetaTags } from "./utils";

type SeoProps = HelmetProps & {
	description?: string;
	name?: string;
	type?: "website" | "article";
};

export default function Seo({
	title,
	description,
	name,
	type = "website",
	...helmetProps
}: SeoProps): ReactNode {
	const { t: translate, i18n } = useTranslation();
	const [pageTitle, setPageTitle] = useState(title);
	const isMounted = useIsMounted();

	const titleUpdate = useCallback(
		(newState: ClientState): void => {
			if (isMounted()) setPageTitle(newState.title);
		},
		[setPageTitle, isMounted]
	);

	const metaTags = generateMetaTags(
		description || translate(strings.helmetDefaultDescription),
		name || translate(strings.helmetDefaultName),
		pageTitle || translate(strings.helmetDefaultTitle),
		type,
		iconMetaContent
	);

	return (
		<Helmet
			onChangeClientState={titleUpdate}
			{...helmetProps}
			title={title || translate(strings.helmetDefaultTitle)}
			htmlAttributes={{
				lang: i18n.language,
				dir: i18n.dir(i18n.language),
			}}
			meta={metaTags}
		/>
	);
}
