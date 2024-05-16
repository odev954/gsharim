import { TestSubmitResult } from "@eco8200/data-models";
import { questionCheckMock } from "../questions/questionCheckMock";
import { questionMocks } from "../questions/questionMocks";

export function testAnswerMock(): TestSubmitResult {
	const checks = Object.keys(questionMocks).map((key: string) =>
		questionCheckMock(key, questionMocks[key].submittedAnswer)
	);
	return {
		checks,
		pointsRecived: 90,
		totalPointsAmount: 100,
	};
}
