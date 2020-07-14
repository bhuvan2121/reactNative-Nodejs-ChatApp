var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

app.get('/', function(req, res){
   res.send("Hello world!");
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("msg",(value,room)=>{
        console.log(room)
        io.emit("recieve"+room,value)
    })

});  

http.listen(3000, function(){
    console.log('listening on *:3000');
  });