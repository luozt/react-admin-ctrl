(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Home = React.createClass({
    render: function(){
      return (
        <p className="bg-info">欢迎来到后台管理系统！</p>
      );
    }
  });

  // exports
  exports("Home", Home);
})();
