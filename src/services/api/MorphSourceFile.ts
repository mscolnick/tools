import { Project, SourceFile } from "ts-morph";

export interface IMorphSourceFileTask {
    morphSourceFile(sourceFile: SourceFile, project: Project): void;
}
