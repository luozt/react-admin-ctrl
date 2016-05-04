var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/push/index.html');
});

io.on('connection', function(){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  var count = 0;

  var timerMsgPush = function(){
    var ranItv = Math.random() * 1000 * 5;

    setTimeout(function(){
      io.emit("message", "这是新的消息，索引号：" + ++count);
      timerMsgPush();
    }, ranItv);
  };

  timerMsgPush();
});