// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const stack = [];
	let contentBuffer = null;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const copy = vscode.commands.registerCommand('copy-stack.copy', async function () {
		const content = await vscode.env.clipboard.readText();
		if (content !== "") {
			stack.push(content);
		}
	});
	const paste = vscode.commands.registerCommand('copy-stack.paste', async function () {
		const content = stack.pop();
		if (stack.length > 0) {
			if (stack.length === 0) {
				contentBuffer = content;
			}
		}
		
		await vscode.env.clipboard.writeText(content || contentBuffer);
	});

	context.subscriptions.push(copy, paste);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
