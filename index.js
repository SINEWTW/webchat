var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
  //res.sendFile('index.html');
});

io.on('connection',function(socket){
     /*console.log('a user connected');*/
     /* Start slogn */
     socket.on('addme',function(username) {
         socket.username = username;
         io.emit('chat message', username+' Hello, welcome!');
     });
     //io.emit('chat message', 'Hello, welcome!');
     /* User offline */
     socket.on('disconnect', function(){
          io.emit('chat message', socket.username+' have disconnect');
     });
     /* showMsg */
     socket.on('chat message', function(msg){
        //console.log('message: ' + msg);
         io.emit('chat message', socket.username+" say: "+msg);
     });
});


http.listen(8181, function(){
  console.log('listening on *:8181');
});
