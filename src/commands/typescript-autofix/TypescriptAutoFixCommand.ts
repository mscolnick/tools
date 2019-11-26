import { Arguments, Argv, CommandModule } from "yargs";
import { MorphProjectFromTasks } from "../../services/morph-projects/MorphProject";
import { TypescriptFixTask } from "../../services/morph-tasks/TypescriptFixTask";
import { getProjectForPackagePath } from "../../utils/getProjectForPackagePath";
import { FixId } from "../../utils/typscript/autofix";

export interface ITypescriptAutoFixCommandArgs {
    fixId: string;

    targetDirectory: string;
}

export class TypescriptAutoFixCommand
    implements CommandModule<ITypescriptAutoFixCommandArgs, ITypescriptAutoFixCommandArgs> {
    public command = "typescript-autofix";
    public describe =
        "Run auto-fix in for all files for a given auto-fix code. See https://github.com/Microsoft/TypeScript/tree/master/src/services/codefixes";

    public builder(args: Argv<ITypescriptAutoFixCommandArgs>) {
        return args
            .option("fixId", {
                describe: "Auto-fix code",
                type: "string",
            })
            .option("targetDirectory", {
                default: process.cwd(),
                describe: "The location of the project to upgrade",
                type: "string",
            })
            .demandOption("fixId");
    }

    public async handler(args: Arguments<ITypescriptAutoFixCommandArgs>) {
        const { targetDirectory, fixId } = args;

        const project = await getProjectForPackagePath(targetDirectory);
        if (project !== undefined) {
            const morphService = new MorphProjectFromTasks([new TypescriptFixTask([fixId as FixId])]);
            await morphService.morphProject(project);
        }
    }
}
