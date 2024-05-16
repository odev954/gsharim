import {
	SubmitTest,
	TestSubmitResult,
	TestSubmitResultSchema,
} from "@eco8200/data-models";
import { testAnswerMock } from "mocks/demo/questionnaire";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function submitTest(data: SubmitTest): Promise<TestSubmitResult> {
	const testAnswer = testAnswerMock();
	return TestSubmitResultSchema.parse(testAnswer);
}
