# A Visual Studio Code extension to configure Jupyter Server within Eclipse che Workspace
This extension configures both user given custom jupyter server  and IBM's jupyter server within eclipse-che's workspace.
&nbsp;

## Features
This extension activates as soons as the workspace loads and configures jupyterhub details within eclipse che workspace removing the need of any manual jupyter server configuration.
&nbsp;
Users can also configure their custom jupyter server and work with the custom jupyter server. It prompts user to give server details and configure server details within eclipse-che workspace.

## Quick start
To Configure user given custom jupyter server.
- Open command palatte and serach for Customserver<br>
&nbsp;
       ![title](https://raw.githubusercontent.com/avulavasudha/vsixfiles/master/commands.png)
       <br>
       &nbsp;
- Click on <i>Customserver:Specify custom server connections </i> 
- Extension propmts to enter server uri
&nbsp;
![](https://raw.githubusercontent.com/avulavasudha/vsixfiles/master/propmt.png)
- Enter valid server url and press Enter
- Configures the server details within the workspace
- Open or create a Jupyter Notebook file (.ipynb) and start coding in Notebook Editor!
- Notebook is connected to your server  
&nbsp;&nbsp;    
- One can directly start working with notebooks if don't want to custom jupyter server.
# Build the extension 
 - Clone the repo
 - Go to the folder you cloned
 - Use the below command to build .vsix file for the extension
 `vsce package`
 - It will give a warning A 'repository' field is missing from the 'package.json' manifest file.
 - press y
 - File will be generated within the same folder
