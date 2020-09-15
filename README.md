[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/thilojahnke/WT4)

# WT4<br/>
Valuation of customers in OpenUI5
<br/>
This app was created while following the Walkthrough tutorial for OpenUI5. It is just for learning propose and there is no productive use.
 It can create customer records with a customer number and two name fields. You can put each customer in a worklist and valuate him from one to six.<br/>
## Installation<br/>
Prequisites: NodeJS,sqlite3
You can install all dependencies with "npm install". To start a local server just type "cds watch". Open your browser and navigate to "localhost:4040"

## Testing mode<br/>
You don't need @sap/cds-dk and sqlite3 if you just want to test the ui. OpenUI5 can use the tooling from sapui5.<br/> 
Dependencies for UI5 Tooling are installed. Just start a server with "ui5 serve"<br/>   
To mock the sqlite3 DB a local mockserver is installed. Just call test/mock.html <br/>
