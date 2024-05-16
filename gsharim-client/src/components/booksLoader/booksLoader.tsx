import bookStack from "assets/lottie/stack-of-books.json";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import * as consts from "./consts";
import { loaderAlt } from "./strings";

export function BooksLoader(): JSX.Element {
	const { t: translate } = useTranslation();
	return (
		<Lottie
			id="lottie-page-loader"
			animationData={bookStack}
			initialSegment={[consts.startFrame, consts.lastFrame]}
			loop
			alt={translate(loaderAlt)}
		/>
	);
}
