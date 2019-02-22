# Installation
Getting the dev environment setup starts with installing Node.js, this is required to run **npm** commands which Vue.js and our application depend on for package management. Download the [Windows MSI installer](https://nodejs.org/en/download/) and follow the prompts. After the installation open a command window and type: 

>npm --version    

The second step is to install the Vue CLI, this package contains build tools which are required during development to display your code changes in a browser window.

>npm install -g @vue/cli
 
Again after installation type:

>vue --version

If you've done everything right you should see the version of Vue installed locally on your machine.



# Project Settup

Navigate to the location of the Data Collector project and open a command prompt at that location. Run the following command:

>npm install

This will install all the packages required to run the project locally that are not stored in source control. After the installation the project can be ran by typing the following command 

>npm run-script serve

Or by opening the Vue UI by using the command 

>vue ui

This opens up a Chrome instance which interfaces with the Vue Cli to make things a bit easier, from here we can manage plugins, dependencies and some basic configs. Under the *Tasks* tab we have the ability to start a local server, build lint or inspect.

Another helpful tool is to install the [Vue Chrome extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en), this adds a tab in the Dev tool window which allows inspection of the Vue instance.




