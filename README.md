# HappyByt
HappyByt is a social network for food lovers.

## NPM Scripts
This repo is enriched with many scripts to ease development. 
The following handpicked scripts may be worth by-hearting.

##### start (`npm start`)
Can be used to clean and build the application from scratch and start
as a service. Can be used to do manual testing locally before pushing
 a feature into production.

##### build (`npm run build`)
Can be used to run a clean build. This will clean the build directories,
install dependencies and then run the individual build commands as
required. 

##### test (`npm test`)
Running this command will execute both express application tests and
react application tests. 

##### quick-start:<env> (`npm run quick-start:<env>`)
This command will start the application in target environment without
 running clean, build or install commands. This can be useful to skip them
 when you know that the application was pre-built successfully.
 
Another usecase of this command is for near-zero downtime application 
restarts, specially when using linux upstart jobs. 

##### react-start (`npm run react-start`)
Running this command will start the react application in development mode. 
 That means, the application will reload when changes are detected.
 This is no magic, this command just uses the react-scripts command internally.
 Real magic is there in react-scripts.

##### express (`npm run express`)
This command will build and start the express application. React application
will also start from the default port, but it will not be built. Thus react-app
changes will go undetected.

This command is useful when you want to run the express app and react app in
two separate terminals.

##### start:watch (`npm run start:watch`)
Running this command will build and start both the express and react apps in
watch mode. Express application is watched using npm-watch, which wraps the
nodemon package.