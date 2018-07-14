
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var tables = new Map();

http.listen(PORT, function(){
  console.log(`listening on ${PORT}`);
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('table', function(info){
    console.log(info);
    
    socket.join(info.table);

    socket.table = info.table;
    
    if(!tables.has(info.table)){
      tables.set(info.table, {
        name: info.table,
        board: info.board
      });
    }else{
      socket.to(info.table).emit('board', tables.get(info.table).board);
    }
  });
  
  socket.on('board-piece-position', info => {
    console.log('board-piece-position', info);
    socket.to(info.board).emit('piece-move', info.piece)
    tables.get(socket.table).board[info.piece.id].position = info.piece.position;
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

