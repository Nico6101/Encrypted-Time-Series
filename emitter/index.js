const { io } = require('socket.io-client');
const socket = io("http://localhost:3000");

socket.emit("hello","world", (response) => {
    console.log('client sent hello event status : ', response.status);
});

socket.on('connect', () => {
    console.log('on connect');
    console.log(socket.id);
    console.log(socket.connected);
});

socket.on("disconnect", () => {
    console.log(socket.connected); // false
});

socket.on("connect_error", () => {
    console.log('connection error retrying..');  
    setTimeout(() => {    socket.connect();  }, 1000);
});