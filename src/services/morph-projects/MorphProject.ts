import { Project } from "ts-morph";
import { IMorphSourceFileTask } from "../api/MorphSourceFile";

export interface IMorphProjectTask {
    morphProject(project: Project): Promise<boolean>;
}

export class MorphProjectFromTasks implements IMorphProjectTask {
    constructor(private migrationTasks: IMorphSourceFileTask[]) {}

    public async morphProject(project: Project): Promise<boolean> {
        let didModify = false;
        await Promise.all(
            project.getSourceFiles().map(sourceFile => {
                sourceFile.onModified(() => {
                    didModify = true;
                });
                for (const task of this.migrationTasks) {
                    task.morphSourceFile(sourceFile, project);
                }
                return sourceFile.save();
            }),
        );
        return didModify;
    }
}
