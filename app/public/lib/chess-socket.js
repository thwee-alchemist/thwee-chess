$(document).ready(function(){
  
  var socket = io();
  
  $('#table').on('change', () => {
    
    var board = {};
    $('.piece').each((index, piece) => {
      board[$(piece).attr('id')] = {id: $(piece).attr('id'), position: $(piece).offset()};
    });
    socket.emit('table', {
      table: $('#table').val(),
      board: board
    });
    
    socket.once('board', board => {
      console.log(board);
      $(board).each((index, piece) => {
        $('#' + piece.id).offset(piece.position);
      });
    });
    
    $(document).attr('title', `${$('#table').val()} - Chess - Social Cartography`);
  });
  
  socket.on('piece-move', (piece) => {
    console.log('piece-move');
    $('#' + piece.id).offset(piece.position);
  });
  
  
  $('.piece').draggable({
    stop: function(event){
      var info = {
        board: $('#table').val(),
        piece: {
          id: $(event.target).attr('id'),
          position: $(event.target).offset()
        }
      };
      console.log(info);
      socket.emit('board-piece-position', info); 
    }
  });
});
