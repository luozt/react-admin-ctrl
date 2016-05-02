(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Navbar = require("Navbar");

  var Content = React.createClass({
    render: function(){
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Navbar />
            </div>
            <div className="col-md-10">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  });

  // exports
  exports("Content", Content);
})();
