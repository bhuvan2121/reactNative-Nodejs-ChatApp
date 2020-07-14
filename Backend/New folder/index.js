const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", socket => {
    console.log("Pudhu Pullingo!!!");

    socket.on("Chat Message", msg => {
        console.log(msg);
        io.emit("Chat Message", msg);
    });
});

server.listen(port, () => console.log("server running on port: " + port));

//sending io receiving socket


// io.on("connection", socket => {
//     console.log("Pudhu Pullingo!!!");

//     socket.on("Chat Message", msg => {
//         console.log(msg);
//         io.emit("Chat Message", msg);
//     });
// });