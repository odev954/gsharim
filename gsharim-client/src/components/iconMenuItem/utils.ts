import { Avatar } from "@eco8200/data-models";

export const getAvatar = (
	e: React.MouseEvent<HTMLLIElement, MouseEvent>
): Avatar => {
	const target = e.target as HTMLImageElement;
	const avatarSrcAttribute = target.attributes.getNamedItem("src");
	const avatarSrc = avatarSrcAttribute?.nodeValue as string;

	return { url: avatarSrc };
};
