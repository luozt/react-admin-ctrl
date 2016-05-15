(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Link = require("Link", "router");

  var ViewHome = React.createClass({displayName: "ViewHome",
    componentDidMount: function(prevProps, prevState){
      AppProvider.publish("update.navbar.activeItem", "home");
      AppProvider.publish("update.Breadbar", {items: []});
    },
    render: function(){
      var appName = AppConfig.appName;
      return (
        React.createElement("div", {className: "main-panel g-home"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, 
              React.createElement("h3", {className: "panel-title"}, "工作管理")
            ), 
            React.createElement("div", {className: "panel-body"}, 
              React.createElement("div", {className: "jumbotron"}, 
                React.createElement("h1", null, "欢迎来到", appName, "！"), 
                React.createElement("p", null, "可进行填报工作，查询工作量，查看消息等操作"), 
                React.createElement("p", null, React.createElement(Link, {to: "/manage", className: "btn btn-primary btn-lg"}, "现在开始"))
              )
            )
          )
        )
      );
    }
  });

  // exports
  exports("ViewHome", ViewHome);
})();
