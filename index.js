var express = require('express');
var path = require("path");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, "lc")));

app.get('/', function(req, res){
  res.sendFile( path.join(__dirname, "lc/index.html"));
});

io.on('connection', function(){
  console.log('a user connected');
});

http.listen(app.get("port"), function(){
  console.log('listening on *:'+app.get("port"));
  var count = 0;

  var timerMsgPush = function(){
    var ranItv = Math.random() * 1000 * 10;

    setTimeout(function(){
      io.emit("message", "这是新的消息，索引号：" + ++count);
      timerMsgPush();
    }, ranItv);
  };

  timerMsgPush();
});