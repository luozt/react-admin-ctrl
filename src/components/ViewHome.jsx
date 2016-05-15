(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Link = require("Link", "router");

  var ViewHome = React.createClass({
    componentDidMount: function(prevProps, prevState){
      AppProvider.publish("update.navbar.activeItem", "home");
      AppProvider.publish("update.Breadbar", {items: []});
    },
    render: function(){
      var appName = AppConfig.appName;
      return (
        <div className="main-panel g-home">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">工作管理</h3>
            </div>
            <div className="panel-body">
              <div className="jumbotron">
                <h1>欢迎来到{appName}！</h1>
                <p>可进行填报工作，查询工作量，查看消息等操作</p>
                <p><Link to="/manage" className="btn btn-primary btn-lg">现在开始</Link></p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  // exports
  exports("ViewHome", ViewHome);
})();
