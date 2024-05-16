import BackgroundImage from "assets/chapter/backgroundTestChapter.jpg";
import { Course } from "@eco8200/data-models";
import Image5 from "assets/chapter/LessonIconExamples/5.svg";
import { lessonMockList } from "./lessonMockList";

export const coursesMock: Course = {
	id: "585be19f-5218-4d30-b05d-921b3eed9438",
	chapters: [
		{
			id: "ab2b5ef8-b8fc-11ed-afa1",
			name: "פרק ראשון - היכרות עם שפת פייתון",
			lessonsMetadata: lessonMockList.slice(0, 6),
		},
		{
			id: "1839370f-2760-4a5f-9f64",
			name: "פרק שני - לולאות ותנאים",
			lessonsMetadata: lessonMockList.slice(6, 9),
		},
		{
			id: "cbc93f40-b8fc-11ed-afa1",
			name: "פרק שלישי - פונקציות ורשימות",
			lessonsMetadata: lessonMockList.slice(9, 13),
			finalExercise: {
				name: "משחק סנייק",
				thumbnailUrl: Image5,
				description: "description placeholder",
				id: "fd0c3efa-0f6f-4b52-96ea-65d350b70de2",
				locked: false,
				progress: 0,
			},
		},
	],
	backgroundUrl: BackgroundImage,
};
