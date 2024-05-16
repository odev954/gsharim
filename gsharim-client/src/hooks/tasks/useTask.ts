import fetchTask from "api/task/fetchTask";
import { Task } from "@eco8200/data-models";
import { useCallback, useContext } from "react";
import { LessonContext, TaskContext } from "contexts";
import { useServerData } from "hooks/server";
import { useLesson } from "hooks/lesson";
import { UseServerDataResult } from "types/server/useServerData";
import { useTranslation } from "react-i18next";
import { getTaskQueryKey, allowedKeyPaths } from "./consts";
import { onTaskUpdate } from "./utils";

type UseTaskProps =
	| {
			taskId: string;
			lessonId: string;
	  }
	| {
			taskId?: never;
			lessonId?: never;
	  }
	| {
			taskId: string;
			lessonId?: never;
	  };

export default function useTask(
	params?: UseTaskProps
): UseServerDataResult<Task, unknown> {
	const { taskId: contextTaskId } = useContext(TaskContext);
	const { lessonId: contextLessonId } = useContext(LessonContext);
	const { i18n } = useTranslation();
	const { language } = i18n;

	const taskId = params?.taskId || contextTaskId;
	const lessonId = params?.lessonId || contextLessonId;

	const { setData: setLesson } = useLesson({ lessonId });

	const taskFetcher = useCallback(
		() => fetchTask(taskId, language),
		[taskId, language]
	);
	const onUpdate = useCallback(
		async (oldData: Task, newData: Task) => {
			await onTaskUpdate(oldData, newData, taskId, setLesson);
		},
		[setLesson, taskId]
	);
	return useServerData({
		queryKey: [getTaskQueryKey, taskId, language],
		queryFn: taskFetcher,
		onUpdate,
		allowedUpdateKeyPaths: allowedKeyPaths,
	});
}
