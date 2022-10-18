import * as vscode from 'vscode';
import { getSidebarContent, getWebViewContent } from './utils/webView';

let instance: vscode.WebviewPanel | undefined;

function showDashboard(context: vscode.ExtensionContext) {
	const columnToShowIn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
	if(instance) {
		instance.webview.html = getWebViewContent(context, "dashboard");
		instance.reveal(columnToShowIn);
	} else {
		const panel = vscode.window.createWebviewPanel(
			'newPage', // viewType
			'Dashboard', // 视图标题
			vscode.ViewColumn.One,
			{ enableScripts: true, retainContextWhenHidden: true },
	
		);
		panel.onDidDispose(() => {
			instance = undefined;
		}, null, context.subscriptions);
		panel.webview.html = getWebViewContent(context, "dashboard");
		instance = panel;
	}

}

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;
	visibile = true;
  constructor(private readonly context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
		try {
			this._view = webviewView;
			webviewView.webview.html = getSidebarContent();
			this.switchToMainDashboard();
			webviewView.onDidChangeVisibility(() => {
				this.switchToMainDashboard();
			});
		} catch (e) {
			console.log('Error', e);
		}
  }

	private switchToMainDashboard() {
		if (this._view?.visible) {
			vscode.commands.executeCommand('workbench.view.explorer');
			showDashboard(this.context);
		}
	}
	
  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }
}

export function activate(context: vscode.ExtensionContext) {
	const sidebarPanel = new SidebarProvider(context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('vs-sidebar-view', sidebarPanel)
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
