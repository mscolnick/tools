import { Project } from "ts-morph";

export interface IMorphProjectTask {
    morphProject(project: Project): Promise<boolean>;
}
