# NodeJS full stack application template

This repository contains a template full-stack application which provides:
 - backend nodejs server
     - mongodb database
     - User management and authentication with google or microsoft
 - es6-based frontend
     - reactjs + redux
     - webpack build process

# Installation

Get the latest (lts) version of node / npm
```
npm install -g n
sudo n lts
```

Install mongodb
```
brew update
brew install mongodb
```

Set up a data dir for mongodb
```
sudo mkdir /data
sudo mkdir /data/db
sudo chown $USER /data/db
``` 

Run mongodb
```
mongod
```

Install dependencies
```
npm install
```

Run
```
npm start
```


# Running for local development
If making changes to the backend code, the following can be used:
```
npm run dev
```

This automatically restarts the server when any js files change, and enables chrome inspection/debugging (see console log for the link for this)

If working purely on browser code, webpack will watch and update the browser code by itself, and it's not desirable to restart the server each time. In this case run:
```
npm run start
```

## Fixtures
Load some fixtures by running 
```
npm run fixtures
```

## MongoDB inspector
A mongoDB inspector (think phpMyAdmin) is available at ```http://localhost:3001/mongo_express/db/app-builder```
This allows creating/deleting and modifying documents in MongoDB.


# Architecture notes

### Editing interface
The backend will have a single *server* route for the authoring interface (e.g. apps.ox.ac.uk/edit)
This will serve a largely empty html page containing:
 - css file links
 - script link to bundled react app for the *editing* interface
 - minimal HTML to insert the react app into
This page is (at present) generated via a twig template, but could potentially be a static page
 
The react app may use multiple *client* routes (after the #) to move between areas of functionality, such as viewing all available user-apps, editing an existing user-app

### Viewing interface
Each user-app will have its own *server* url for end users to view it (e.g. apps.ox.ac.uk/andys-awesome-app)
This will serve a page tailored to that app containing:
 - css file links (possibly some custom css pages for that site)
 - script link to a bundled react app for presenting the user-app. This will contain some of the same code as the editing interface, but will omit much of it.
 - generated manifest file (app name, icons etc.)
 - generated service worker file (preload and cache all images/styles/html/js/data etc for this user-app)
 
#### server-side rendering
In future we will implement server-side rendering / caching of the viewing interface in order to:
 - Download the page faster
 - Avoid having to build up the dom on the client
 - Be able cache the built page
 - Allow indexing by search engines


# Notes on server setup / deployment
## dependencies
Appropriate dependencies can be put in place using puppet. See the mobile-app-builder and wycliffite-bible modules in the github.com/ox-it/puppet repo.

One additional step is required before running the puppet module in order to register an apt repository for up-to-date nodejs.
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
```
This should ultimately be done via puppet

## deployment
Deployment is straightfoward, requiring only:
* Copy package file
* Update node dependencies
* Copy backend source files
* Copy built frontend files
* Restart server

These steps are currently encapsulated in the Visual Studio build process for the mobile-app-builder and wycliffite-bible projects.

## Running as a service
In order for the site to be available after a reboot, it is best to run it as a daemon service.
This can be done using [forever-service](https://github.com/zapty/forever-service)

The puppet manifests for some projects (e.g. wycliffite) illustrate how the service can be set up via puppet.

The main difficulty is that environment variables for the service to see must be specified in the command which sets up the service. In future it might be better to make these available in another way.

