import { SVGProps } from "react";
import * as ReactDOMServer from "react-dom/server";

function backgroundSvg(
	Svg: React.ReactElement<SVGProps<SVGSVGElement>>
): string {
	const svgString = encodeURIComponent(
		ReactDOMServer.renderToStaticMarkup(Svg)
	);

	return `url("data:image/svg+xml,${svgString}")`;
}

export { backgroundSvg };
