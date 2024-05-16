import { useEffect, useState } from "react";
import GameDataDisplayBarComponent from "./gameDataDisplayBarComponent";
import { LivesAsset } from "./types";
import { TimerTickEvery, InitialTimerValue } from "./consts";

type GameDataDisplayBarContainerProps = {
	gameRunning: boolean;
	score?: number;
	headerText?: string;
	lives?: number;
	livesAsset?: LivesAsset;
	fontSize?: number;
	color?: string;
};
export default function GameDataDisplayBarContainer({
	gameRunning,
	score,
	headerText,
	lives,
	livesAsset,
	fontSize,
	color,
}: GameDataDisplayBarContainerProps): JSX.Element {
	const [secondsPassed, setSecondsPassed] = useState(InitialTimerValue);
	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (gameRunning) {
			const timoutId = setTimeout(() => {
				setSecondsPassed((current) => current + 1);
			}, TimerTickEvery);
			return () => {
				clearTimeout(timoutId);
			};
		}
		setSecondsPassed(InitialTimerValue);
	}, [secondsPassed, gameRunning]);

	return (
		<GameDataDisplayBarComponent
			secondsPassed={secondsPassed}
			score={score}
			headerText={headerText}
			lives={lives}
			livesAsset={livesAsset}
			fontSize={fontSize}
			color={color}
		/>
	);
}
