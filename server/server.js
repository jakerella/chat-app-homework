var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(bodyParser.json());

app.post('/login', function handleLogin(req, res) {
    console.log(req.body);
    if (req.body.username) {
        io.emit('message', { message: req.body.username + ' joined the chat', username: 'System' });
        res.json({ username: req.body.username });
    } else {
        res.status(400).json({ error: 'Please provide a username to log in.' });
    }
});

app.post('/chat', function handleChat(req, res) {
    if (!req.body.username) {
        res.status(400).json({ error: 'Sorry, but you did not provide a username!' });
    }
    io.emit('message', { message: req.body.message || '', username: req.body.username });
    res.json({ message: req.body.message || '', username: req.body.username });
});

io.on('connection', function handleNewConnect(socket) {
    socket.emit('message', { message: 'Chat initiated', username: 'System', id: socket.id.substr(2) });
});

http.listen(3000, function(){
    console.log('listening on localhost:3000');
});
