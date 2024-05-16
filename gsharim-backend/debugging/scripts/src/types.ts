export type RoutineFunction = () => void;

export type RoutineMap = {
	[key: string]: RoutineFunction;
};
