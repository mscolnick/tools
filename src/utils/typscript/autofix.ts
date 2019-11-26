import { CombinedCodeActions, Project, SourceFile } from "ts-morph";

export enum FixId {
    FIX_UNUSED_IDENTIFIER_DELETE = "unusedIdentifier_delete",
    FIX_MISSING_IMPORT = "fixMissingImport",
}

export function applyCodeFixesFromTypescript(project: Project, file: SourceFile, fixIds: FixId[]) {
    for (const fixId of fixIds) {
        applyCodeFix(project, file, fixId);
    }
}

function applyCodeFix(project: Project, file: SourceFile, fixId: FixId) {
    let fixes = getCodeFixes(project, file, fixId);
    while (fixes.getChanges().length !== 0) {
        const change = fixes.getChanges()[0];
        file.applyTextChanges(change.getTextChanges());
        fixes = getCodeFixes(project, file, fixId);
    }
}

function getCodeFixes(project: Project, file: SourceFile, fixId: FixId): CombinedCodeActions {
    const codeFixes = project.getLanguageService().getCombinedCodeFix(file, fixId);
    return codeFixes;
}
