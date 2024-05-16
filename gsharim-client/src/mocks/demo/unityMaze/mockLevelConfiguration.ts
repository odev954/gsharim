import { MazeSetupMessage } from "@eco8200/data-models";

const SetupMessage: MazeSetupMessage = {
	player: {
		topLeftX: 0,
		topLeftY: 0,
		width: 1,
		height: 1,
	},
	playerSpeed: 20,
	target: {
		topLeftX: 12.5,
		topLeftY: 1.75,
		width: 0.5,
		height: 0.5,
	},
	terrain: [
		{
			topLeftX: 1,
			topLeftY: 1,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 2.1,
			topLeftY: 2,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 3.2,
			topLeftY: 1,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 4.3,
			topLeftY: 2,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 5.4,
			topLeftY: 1,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 6.7,
			topLeftY: 2,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 7.8,
			topLeftY: 1,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 8.9,
			topLeftY: 2,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 10,
			topLeftY: 1,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 11.1,
			topLeftY: 2,
			width: 0.1,
			height: 1,
		},
		{
			topLeftX: 12.2,
			topLeftY: 1,
			width: 1.25,
			height: 1,
		},
		{
			topLeftX: 13.25,
			topLeftY: 2,
			width: 1.25,
			height: 2,
		},
	],
	worldWidth: 14,
	worldHeight: 2,
};
export default SetupMessage;
