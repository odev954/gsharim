import { SectionType } from "@eco8200/data-models";
import { InstructionsSection } from "./instructionsSection";
import { SlideSection } from "./slideSection";
import IdeSection from "./ideSection";
import GenialSection from "./genialSection";
import VideoSection from "./videoSection";
import MazeGameSection from "./mazeGameSection";
import SnakeGameSection from "./snakeGameSection";
import FarmGameSection from "./farmGameSection";
import BasketsGameSection from "./basketsGameSection";
import QuizSection from "./quizSection";
import TestSection from "./testSection";
import P5Section from "./p5Section";

type SectionTypeMap = {
	[Key in SectionType]: React.FC<{
		isScrollComplete?: boolean;
	}>;
};

const SectionsComponents: SectionTypeMap = {
	[SectionType.Ide]: IdeSection,
	[SectionType.Instructions]: InstructionsSection,
	[SectionType.Video]: VideoSection,
	[SectionType.Slide]: SlideSection,
	[SectionType.Quiz]: QuizSection,
	[SectionType.Test]: TestSection,
	[SectionType.GeniallyAnimation]: GenialSection,
	[SectionType.MazeGame]: MazeGameSection,
	[SectionType.SnakeGame]: SnakeGameSection,
	[SectionType.BasketsGame]: BasketsGameSection,
	[SectionType.FarmGame]: FarmGameSection,
	[SectionType.P5]: P5Section,
} as SectionTypeMap;

export default SectionsComponents;
