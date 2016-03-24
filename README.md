# Chat Application

A little homework assignment for creating a chat application (front end only).

If you would like to use this application to create a small chat application simply clone the repository to your machine and work on creating the `client/js/chat-app.js` file. All of the back end (server) is given to you, as well as connecting to the web socket using socket.io on the front end. In your front end code you will need to use the `window.chat.init()` function to start the Socket IO connection and give it a function to call when you receive a message. Then, simply execute Ajax calls to the back end (written in Node.js) to log in and send chat messages.

## Starting the server

To run the server and see your front end application first make sure you have [Node.js installed](https://nodejs.org/en/). Then go to your command line, naviagte to the directory where this file exists on your machine, and run two commands:

```bash
npm install

node .
```

The first one installs the dependencies, the second starts the server application. Then navigate to <http://localhost:3000> in your web browser.

## Your Mission

Your mission is to complete the front end of the application. The server provides you with two API endpoints you need to call (see below), but you must first initiate the chat connection:

`window.chat.init(function messageHandler(data) { /* ... */ });`

This initializes [socket.io](http://socket.io/) connection to the chat server you are now running locally and you must provide a function (called "messageHandler" above) which will be called whenever you receive a new chat message from a user. This will be in the format: `{ "message": "the chat message", "username": "theuser" }` - what do you need to do with this data??

The two API endpoints you need to call using Ajax are below:

* `POST /login`  
  Call this endpoint to log the user in. You must pass a JSON object in the POST body that looks like:  
  `{ "username": "myname" }`
* `POST /chat`
  Call ths endpoint to send a chat message once you've logged in. The POST body must be JSON in the following format:  
  `{ "message": "my chat message", "username": "myname" }`

When you get a successful response from the `/login` endpoint then you need to hide the login form and show the chat message interface. You don't really _need_ to do anything when you send a chat message, but there are some nice things you could do for the user.
