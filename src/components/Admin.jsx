(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Admin = React.createClass({
    render: function(){
      return (
        <div> Admin pane! </div>
      );
    }
  });

  // exports
  exports("Admin", Admin);
})();
