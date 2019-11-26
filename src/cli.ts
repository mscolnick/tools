import * as yargs from "yargs";
import { TypescriptAutoFixCommand } from "./commands/typescript-autofix/TypescriptAutoFixCommand";

(async function main() {
    yargs
        .strict()
        .wrap(150)
        .command(new TypescriptAutoFixCommand() as yargs.CommandModule<any, any>)
        .demandCommand()
        .help()
        .parse();
})();
