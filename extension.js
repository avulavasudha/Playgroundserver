const vscode = require('vscode');
const fs = require('fs');
const validUrl = require('valid-url');
//const PLAYGROUND_JUPYTER_SERVER = "169.60.204.172"

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('userJupyterServer.hubconnection', async function (){
            let todo = {
                "username": process.env.CHE_WORKSPACE_ID,
                "password": ""
            };
            var server_ip=process.env.PLAYGROUND_JUPYTER_SERVER;
            const fs = require('fs')
            const fetch = require('node-fetch');
            fetch(`http://${server_ip}/hub/api/authorizations/token`, {
                    method: 'POST',
                    body: JSON.stringify(todo)
                })
                .then(res => res.json())
                .then(json => {
                    const a = `{"python.dataScience.jupyterServerURI": "${server_ip}/user/${process.env.CHE_WORKSPACE_ID}/?token=${json["token"]}",
                                 "python.disableInstallationCheck": true}`
                    fs.writeFile('/home/theia/.theia/settings.json', a, err => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        const {exec} = require('child_process');
                        const b = `curl -X POST -H "Authorization: token ${json["token"]}" "${server_ip}/hub/api/users/${process.env.CHE_WORKSPACE_ID}/server"`
                        exec(`${b}`, (error, stdout, stderr) => {
                            if (error) {
                                return;
                            }
                            if (stderr) {
                                return;
                            }
                        })
                    });
                })
            vscode
                .window
                .showInformationMessage('JupyterServer configuration done!');
            });
vscode
        .commands
        .registerCommand('userJupyterServer.connection', async function () {
            // The code you place here will be executed every time your command is executed
            vscode
                .commands
                .executeCommand('editor.action.addCommentLine');
            // Display a message box to the user
            const x = await vscode
                .window
                .showInputBox({
                    placeHolder: "Enter your URL",
                    validateInput: text => {
                         // you don't need this
                        return text === validUrl.isUri(text)
                            ? null
                            : 'Not a URL'; // return null if validates
                    }
                });
            const set = `{
                "python.dataScience.jupyterServerURI": "${x}",
                "python.disableInstallationCheck": true
            }`;
            if (validUrl.isUri) {
                await fs.writeFile('/home/theia/.theia/settings.json', set, err => {
                    if (err) {
                        console.error(err);
                    } else {
                    }
                });
                vscode.window.showInformationMessage('User given custom server configured');
            }
        });
    context
        .subscriptions
        .push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
