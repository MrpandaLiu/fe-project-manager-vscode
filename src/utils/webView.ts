import path from 'path';
import * as vscode from 'vscode';

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


export function getWebViewContent(context: vscode.ExtensionContext, page: string) {
  const resourcePath = path.join(
    context.extensionPath,
    './build/js',
		`${page}.js`
  );

  console.log('resourcePath', resourcePath);

  // Use a nonce to whitelist which scripts can be run
  const nonce = getNonce();

	return `
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="UTF-8" />
          <title>fly-code!</title>
      </head>
      <style>
        body {
          background-color: transparent !important;
        }
      </style>
      <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      <body>
          <div id="root"></div>
          <!-- Main -->
          <div>This is Test Page<div>
          <script nonce="${nonce}" src="vscode-resource:${resourcePath}"></script>
      </body>
  </html>

  `;
}

export function getSidebarContent() {
	return `
<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
	</head>
	<body>
			<p>If you are reading this, you have placed the Project Dashboard sidebar view into another sidebar container. 
			This view is not intended to be visible. Instead, it is simply a shortcut for opening the main Project Dashboard.</p>

			<p>If you moved the sidebar view unintentionally and want to restore the original (intended) state, 
			please drag and drop this panel onto the sidebar.</p>

			<p>If you encounter any problems or think this behaviour is misleading, 
			<a href="https://github.com/Kruemelkatze/vscode-dashboard/issues">please let me know.</a></p>

	</body>
	</html>
`;
}
