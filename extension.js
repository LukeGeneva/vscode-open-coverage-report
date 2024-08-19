const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'open-coverage-report',
    openCoverageReport,
  );

  context.subscriptions.push(disposable);
}

function openCoverageReport() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const document = editor.document;
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
  if (!workspaceFolder) return;

  const workspacePath = workspaceFolder.uri.fsPath;
  const filePath = document.uri.fsPath;
  const relativePath = vscode.workspace.asRelativePath(filePath);
  const coverageReportPath = `${workspacePath}/coverage/lcov-report/${relativePath}.html`;
  const uri = vscode.Uri.file(coverageReportPath);
  vscode.env.openExternal(uri);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
