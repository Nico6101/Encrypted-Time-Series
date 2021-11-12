const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {  
    res.send('<h1>Hello world</h1>'); // to check whether the server is running correctly.
});

io.on('connection', (socket) => {  
    console.log('a user connected');
    console.log(socket.id);
    socket.on("hello", (arg, callback) => {
        console.log('event hello working')
        console.log(arg);
        callback({ status: "ok" })
    })
});

server.listen(3000, () => {  console.log('listening on *:3000');});