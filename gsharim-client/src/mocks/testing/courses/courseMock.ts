import BackgroundImage from "assets/chapter/backgroundTestChapter.jpg";
import { Course } from "@eco8200/data-models";
import Image5 from "assets/chapter/LessonIconExamples/5.svg";
import { lessonMetadataMockList } from "./lessonaMetadataMockList";

export const courseMock: Course = {
	id: "585be19f-5218-4d30-b05d-921b3eed9438",
	chapters: [
		{
			id: "4769c356-5c06-4409-a355-6ed8a4f7bddd",
			name: "חלק ראשון - בדיקת תפריט שיעורים",
			lessonsMetadata: lessonMetadataMockList,
			finalExercise: {
				name: "בדיקה שש עשרה",
				thumbnailUrl: Image5,
				description: "description placeholder",
				id: "16",
				locked: false,
				progress: 59,
			},
		},
	],
	backgroundUrl: BackgroundImage,
};
