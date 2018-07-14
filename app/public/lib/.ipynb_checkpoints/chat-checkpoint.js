$(function () {
  var socket = io('https://arcania-3.herokuapp.com');
  $('#board-id').on('keypress', (event) => {
    console.log(event);
    socket.emit('room', $(this).val())
    $(document).attr('title', `${$(this).val()} - Chess - Social Cartography`);
  });
  
  $('form').submit(function(){
    socket.emit('chat message', `${$('#screen-name').val()}: ${$('#m').val()}`);
    $('#m').val('');
    return false;
  });
  
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});
