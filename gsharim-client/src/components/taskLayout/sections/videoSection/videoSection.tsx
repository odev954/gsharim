import { useCallback, useMemo, useRef } from "react";
import ReactPlayer, { Config } from "react-player";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { VideoSectionData } from "@eco8200/data-models";
import useKeyPress from "react-use-keypress";
import { generateConfig } from "./utils";
import * as styles from "./styles";
import * as consts from "./consts";

export default function VideoSection({
	video,
	id,
}: VideoSectionData): JSX.Element {
	const videoRef = useRef<ReactPlayer>(null);

	const config: Config = useMemo(() => generateConfig(video), [video]);

	const { approveSection } = useSetSectionBlocking(id);

	const seekTime = useCallback(
		(timeToAddToVideo: number) => {
			const timeToSeek = videoRef.current!.getCurrentTime() + timeToAddToVideo;

			videoRef?.current?.seekTo(timeToSeek, "seconds");
		},
		[videoRef]
	);

	const handleSeekTimeForward = useCallback(() => {
		seekTime(consts.timeToAdd);
	}, [seekTime]);

	const handleSeekTimeBack = useCallback(() => {
		seekTime(consts.timeToDecrease);
	}, [seekTime]);

	useKeyPress(consts.arrowRight, handleSeekTimeForward);
	useKeyPress(consts.arrowLeft, handleSeekTimeBack);

	return (
		<ReactPlayer
			style={styles.reactPlayer}
			height={styles.height}
			width={styles.width}
			url={video.videoUrl}
			controls
			ref={videoRef}
			config={config}
			onEnded={approveSection}
		/>
	);
}
