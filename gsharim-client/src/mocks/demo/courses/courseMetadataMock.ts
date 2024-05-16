import {
	CourseMetadata,
	DifficultyLevel,
	RibbonType,
} from "@eco8200/data-models";

import { courseListItemTemplateImage } from "assets/welcomePageImages";

export const coursesMetadataMock: CourseMetadata[] = [
	{
		id: "585be19f-5218-4d30-b05d-921b3eed9438",
		name: "מבוא לפייתון",
		description: "מבוא לתכנות בשפת פייתון.",
		creator: {
			id: "06b7d1b3-4709-4266-9cb1-914f18c884c9",
			name: "אקו 8200",
			resume: "",
		},
		progress: undefined,
		ribbon: RibbonType.New,
		skillSet: ["דיבור בשפת הנחשים", "הבנה בשפות תכנות", "תכנות בסיסי בפייתון"],
		tags: [
			{
				id: "bdc5d57a-8a33-4737-9dd1-7847934ec4ba",
				label: "תכנות",
			},
			{
				id: "34e257f6-0982-4006-b003-f5f81c9ac029",
				label: "מבוא",
			},
		],
		difficulty: DifficultyLevel.Easy,
		duration: 100,
		registrations: 1,
		created: new Date(),
		updated: new Date(),
		thumbnailUrl: courseListItemTemplateImage,
		hasCertificate: false,
		public: false,
	},
];
