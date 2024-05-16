import ISectionData from "../../sections/abstract/sectionData";
import TaskMetadata from "./taskMetadata";
import ILayout from "../../layouts/abstract/layout";

export default interface Task {
	metadata: TaskMetadata;
	layout: ILayout;
	sections: ISectionData[];
}
