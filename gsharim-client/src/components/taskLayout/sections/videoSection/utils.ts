import { Video } from "@eco8200/data-models";
import { Config } from "react-player";

export const generateConfig = (video: Video): Config => {
	const config: Config = {};

	if (video.videoVariant === "mp4" && video.subtitles) {
		const { subtitles } = video;

		config.file = {
			tracks: [
				{
					kind: "subtitles",
					src: `/subtitles/${subtitles.filename}`,
					label: subtitles.label,
					default: subtitles.default,
					srcLang: subtitles.language,
				},
			],
		};
	}

	return config;
};
