(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Banner = require("Banner");
  var LoginModal = require("LoginModal");
  var Topbar = require("Topbar");
  var Navbar = require("Navbar");

  var Content = React.createClass({
    render: function(){
      return (
        <div>
          <Topbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <Navbar />
              </div>
              <div className="col-sm-10">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });


  // exports
  exports("Content", Content);
})();
