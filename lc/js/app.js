(function(){
  var AppConfig = require("AppConfig", "globals");
  var AppProvider = require("AppProvider", "globals");

  var MainView = require("MainView");

  var App = React.createClass({displayName: "App",
    componentDidMount: function(prevProps, prevState){
      MessageListen.init();
    },
    render: function(){
      return (
        React.createElement(MainView, null)
      );
    }
  });

  // 消息推送模块
  var MessageListen = {
    subscribe: function(){
      // APP载入后开始监听消息推送
      AppProvider.subscribe("update.message.new", function(event, data){
        AppProvider.createMessage(data, function(response){
          if(response && response.err){
            return alert(response.err);
          }
          AppProvider.publish("update.ViewMessage");
        });
      });
    },

    listen: function(){
      var socket = io();
      socket.on("message", function(msg){
        AppProvider.publish("update.message.new", msg);
      });
    },

    init: function(){
      this.subscribe();
      this.listen();
    }
  };

  ReactDOM.render(
    React.createElement(App, null)
    , document.getElementById("container")
  );

})();
