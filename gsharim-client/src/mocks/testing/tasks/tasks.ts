import {
	LayoutType,
	Task,
	SectionType,
	IdeSectionData,
	VideoSectionData,
	SlideSectionData,
	InstructionsSectionData,
} from "@eco8200/data-models";
import { instructionsSectionMock } from "../instructionsSection";
import { questionnaireMock } from "../questionnaire";

import { tasksMetadataListMock } from "./tasksMetadataList";

const sectionListMock: InstructionsSectionData[] = [instructionsSectionMock()];

type TasksMockType = {
	[key: string]: Task;
};
export const tasksMock: TasksMockType = {
	"737e0622-7c1e-4ab8-b344-991a2be25b9f": {
		metadata: tasksMetadataListMock[0],
		layout: { layoutType: LayoutType.SingleVerticalTwoHorizontal },
		sections: [
			questionnaireMock(true),
			{
				id: "2",
				variant: SectionType.Ide,
				defaultCode: 'print("hello world!")',
				api: {},
			} as IdeSectionData,
			questionnaireMock(false),
		],
	},
	"4180ac1c-bcfa-4a05-956e-8c5718b2269d": {
		metadata: tasksMetadataListMock[1],
		layout: { layoutType: LayoutType.SingleVerticalTwoHorizontal },
		sections: [
			{
				id: "1",
				variant: SectionType.Video,
				video: {
					videoUrl:
						"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
					subtitles: {
						filename: "sample.vtt",
						language: "en",
						label: "sample subtitles",
						default: true,
					},
				},
			} as VideoSectionData,
			{
				id: "2",
				variant: SectionType.Ide,
				defaultCode: 'print("hello world!")',
				api: {},
			} as IdeSectionData,
			instructionsSectionMock(),
		],
	},
	"0f1c280a-dc7b-4059-a1c2-e75797ed84b7": {
		metadata: tasksMetadataListMock[2],
		layout: { layoutType: LayoutType.SingleSection },
		sections: [
			{
				id: "bf9b7be0-2aad-48af-abee-d05fc4c12abe",
				variant: SectionType.Slide,
				googleSlideId: "1lxQc8xc5lpbhkH5pQ5P8IV0D4n33xLg9",
				slideStartIndex: 0,
				mandatoryTime: 0,
				options: { showControls: false },
			} as SlideSectionData,
		],
	},
	"e126bcbf-6429-4c6b-b2e4-99e21f895cac": {
		metadata: tasksMetadataListMock[0],
		layout: {
			layoutType: LayoutType.SingleSection,
		},
		sections: sectionListMock,
	},
	"e126bcbf-6429-4c6b-b2e4-gogogagacac": {
		metadata: tasksMetadataListMock[3],
		layout: {
			layoutType: LayoutType.SingleVerticalTwoHorizontal,
			sizes: { innerSplitLowerSection: 50, outerSplitLeftSection: 20 },
		},
		sections: sectionListMock,
	},
};
