(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Message = React.createClass({
    render: function(){
      return (
        <div> message pane! </div>
      );
    }
  });

  // exports
  exports("Message", Message);
})();
