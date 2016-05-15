(function(){
  var AppConfig = require("../js/config.js");
  var AppProvider = require("../js/provider.js");

  var Banner = require("./Banner.jsx");
  var LoginModal = require("./LoginModal.jsx");
  var Topbar = require("./Topbar.jsx");
  var Navbar = require("./Navbar.jsx");

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
  module.exports = Content;
})();
