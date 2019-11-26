import * as fs from "fs-extra";
import * as path from "path";
import { Project } from "ts-morph";

export async function getProjectForPackagePath(packagePath: string): Promise<Project | undefined> {
    const tsConfigFilePath = path.join(packagePath, "src", "tsconfig.json");
    if (await fs.pathExists(tsConfigFilePath)) {
        const project = new Project({ tsConfigFilePath });
        return project;
    }
    return undefined;
}
