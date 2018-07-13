/*
  index.js
  Joshua Marshall Moore
  July 12th, 2018

  North Las Vegas, Nevada

  Goal of this server is to relay messages between chess players. 
*/

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('board-id', function(info){
    socket.join(info.board_id);
  });
  
  socket.on('board-piece-position', info => {
    socket.join(info.board);
    sokcet.emit('piece-move', info.piece)
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

