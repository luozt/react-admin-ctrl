var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/src', function(req, res){
  res.sendfile('src/index.html');
});

io.on('connection', function(){
  console.log('a user connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
  var count = 0;

  var timerMsgPush = function(){
    var ranItv = Math.random() * 1000 * 30;

    setTimeout(function(){
      io.emit("message", "这是新的消息，索引号：" + ++count);
      timerMsgPush();
    }, ranItv);
  };

  timerMsgPush();
});