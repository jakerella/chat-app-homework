var path = require('path');
var crypto = require('crypto');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session = require('express-session');

var sessionMiddleware = session({ secret: 'tiy-chat-homework' });

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(bodyParser.json());

app.post('/login', function handleLogin(req, res) {
    console.log('logging in with:', req.body);
    if (req.body.username) {
        req.session.username = req.body.username;
        req.session.token = crypto.createHash('sha1').update(req.session.username).digest('hex');
        io.emit('message', { message: req.body.username + ' joined the chat', username: 'System' });
        res.json({ username: req.body.username, token: req.session.token });
    } else {
        res.status(400).json({ error: 'Please provide a username to log in.' });
    }
});

app.post('/chat', function handleChat(req, res) {
    console.log('Checking tokens:', req.headers.authorization, req.session.token);
    if (!req.headers.authorization || req.headers.authorization !== req.session.token) {
        res.status(403).json({ error: 'Sorry, but you did not provide a valid token!' });
        return;
    }
    io.emit('message', { message: req.body.message || '', username: req.session.username });
    res.json({ message: req.body.message || '', username: req.session.username });
});

io.on('connection', function handleNewConnect(socket) {
    socket.emit('message', { message: 'Chat initiated', username: 'System' });
});

http.listen(3000, function(){
    console.log('listening on localhost:3000');
});
