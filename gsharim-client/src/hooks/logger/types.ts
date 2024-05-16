import { Avatar, LessonMetadata } from "@eco8200/data-models";
import { logFunctionsType } from "types/logger/log";

export type LogTypes = keyof LogPayload;

export type LogPayload = {
	"course-clicked": CoursePayload;
	"user-logged-in": undefined;
	"clicked-on-logout": undefined;
	"user-received-error": UserErrorPayload;
	"lesson-clicked": LessonPayload;
	"logo-clicked": undefined;
	"avatar-changed": AvatarPayload;
	"lesson-button-clicked": LessonButtonPayload;
	"skip-button-clicked": undefined;
	"course-catalog-clicked": undefined;
	"authority-hovered": undefined;
	"map-landmark-hovered": LandmarkPayload;
	"ide-button-clicked": IdePayload;
	"footer-link-clicked": FooterLinkPayload;
	"code-running": CodePayload;
};

interface LessonButtonPayload {
	isTaskButtons: boolean;
	isLessonButtons: boolean;
	isPreviousButtons: boolean;
}

interface UserErrorPayload {
	error: Error;
}

interface LessonPayload {
	lessonMetadata: LessonMetadata;
}

interface LandmarkPayload {
	landmarkName: string;
}

interface AvatarPayload {
	avatar: Avatar;
}

interface IdePayload {
	buttonName: string;
	isRunning: boolean;
	isReady: boolean;
}

interface CodePayload {
	code: string;
}

interface CoursePayload {
	courseName: string;
}

interface FooterLinkPayload {
	linkName: string;
}

export type LogFunction<T extends LogTypes> = (
	message: T,
	description: string,
	payload?: LogPayload[T]
) => void;

export type Log<T extends LogTypes> = (
	logAction: logFunctionsType,
	message: T,
	description: string,
	payload?: LogPayload[T]
) => void;
