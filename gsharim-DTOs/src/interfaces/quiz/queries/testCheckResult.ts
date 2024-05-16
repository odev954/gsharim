import QuestionCheckResult from "./questionCheckResult";

export default interface TestCheckResult {
	checks: QuestionCheckResult[];
	pointsRecived: number;
	totalPointsAmount: number;
}
