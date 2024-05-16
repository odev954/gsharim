import { DetailedHTMLProps, MetaHTMLAttributes } from "react";

export function generateMetaTags(
	description: string,
	name: string,
	title: string,
	type: "website" | "article",
	image: string
): DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] {
	return [
		{
			name: "description",
			content: description,
		},
		{ property: "og:type", content: type },
		{ property: "og:image", content: image },
		{
			property: "og:site_name",
			content: name,
		},
		{
			property: "og:title",
			content: title,
		},
		{
			property: "og:description",
			content: description,
		},
		{
			name: "twitter:creator",
			content: name,
		},
		{ name: "twitter:card", content: image },
		{ name: "twitter:image", content: image },
		{
			name: "twitter:title",
			content: title,
		},
		{
			name: "twitter:description",
			content: description,
		},
	];
}
