import { SVGProps } from "react";
import { TaskType } from "@eco8200/data-models";
import {
	Code,
	FreeContent,
	Presentation,
	Quiz,
	Video,
} from "assets/lessonStepper";

export const taskTypeToIconSrc: {
	[key in TaskType]: React.FC<SVGProps<SVGSVGElement>>;
} = {
	[TaskType.Exercise]: Code,
	[TaskType.Image]: FreeContent,
	[TaskType.InteractiveAnimation]: Video,
	[TaskType.Lecture]: Video,
	[TaskType.Presentation]: Presentation,
	[TaskType.Quiz]: Quiz,
};
