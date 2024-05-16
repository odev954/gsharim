import React from "react";
import Lesson from "./lesson";
import Chapter from "./chapter";
import Course from "./course";

const Welcome = React.lazy(() => import("pages/welcome"));
const CourseRoadmap = React.lazy(() => import("pages/courseRoadmap"));
const Task = React.lazy(() => import("pages/task"));
const CourseCatalog = React.lazy(() => import("pages/courseCatalog"));

export { Task, Lesson, Chapter, Course, Welcome, CourseRoadmap, CourseCatalog };
