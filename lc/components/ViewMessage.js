(function(){
  var AppConfig = require("AppConfig", "globals");
  var AppProvider = require("AppProvider", "globals");
  var Helper = require("Helper", "globals");

  var ViewMessage = React.createClass({displayName: "ViewMessage",
    componentDidMount: function() {
      AppProvider.publish("update.navbar.activeItem", "message");
      AppProvider.publish("update.Breadbar", {items: [{text: "消息列表"}]});
    },
    render: function(){
      return (
        React.createElement("div", {className: "main-panel g-viewManage"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, 
              React.createElement("h3", {className: "panel-title"}, "消息列表")
            ), 
            React.createElement(MessageBody, null)
          )
        )
      );
    }
  });

  var MessageBody = React.createClass({displayName: "MessageBody",
    render: function(){
      return (
        React.createElement("div", {className: "panel-body"}, 
          React.createElement("p", {className: "text-info"}, "每个随机10秒会接收到服务器端推送的消息："), 
          React.createElement("table", {className: "table table-bordered table-hover"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, "#"), 
                React.createElement("th", null, "消息接收时间"), 
                React.createElement("th", null, "消息内容")
              )
            ), 
            React.createElement(MessageListBody, null)
          )
        )
      );
    }
  });

  var MessageListBody = React.createClass({displayName: "MessageListBody",
    getInitialState: function() {
      return {
        data: null
      };
    },

    refreshRender: function(){
      AppProvider.queryMessageList(function(response){
        if(this.unmount){return;}
        if(response && response.err){
          return alert(response.err);
        }
        this.setState({data: response});
      }.bind(this));
    },

    componentWillMount: function(){
      AppProvider.subscribe("update.ViewMessage", function(){
        this.refreshRender();
      }.bind(this));
    },

    componentWillUnmount: function(){
      AppProvider.unsubscribe("update.ViewMessage");
      this.unmount = true;
    },

    componentDidMount: function(){
      this.refreshRender();
    },

    render: function(){
      return (
        React.createElement("tbody", null, 
        
          this.state.data && this.state.data.length ?
          this.state.data.map(function(item, index){
            return (
              React.createElement("tr", {key: item.id}, 
                React.createElement("td", null, index+1), 
                React.createElement("td", null, Helper.time2str(item.createTime, "sec")), 
                React.createElement("td", null, item.msg)
              )
            );
          }.bind(this)) : React.createElement("tr", null, React.createElement("td", {colSpan: "3"}, "暂无数据"))
        
        )
      );
    }
  });

  // exports
  exports("ViewMessage", ViewMessage);
})();
