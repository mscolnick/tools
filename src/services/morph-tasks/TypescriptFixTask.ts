import { Project, SourceFile } from "ts-morph";
import { applyCodeFixesFromTypescript, FixId } from "../../utils/typscript/autofix";
import { IMorphSourceFileTask } from "../api/MorphSourceFile";

export class TypescriptFixTask implements IMorphSourceFileTask {
    constructor(private typescriptFixIds: FixId[]) {}
    public morphSourceFile(sourceFile: SourceFile, project: Project): void {
        applyCodeFixesFromTypescript(project, sourceFile, this.typescriptFixIds);
    }
}
