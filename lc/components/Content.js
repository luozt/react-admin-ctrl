(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Banner = require("Banner");
  var LoginModal = require("LoginModal");
  var Topbar = require("Topbar");
  var Navbar = require("Navbar");

  var Content = React.createClass({displayName: "Content",
    render: function(){
      return (
        React.createElement("div", null, 
          React.createElement(Topbar, null), 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-sm-2"}, 
                React.createElement(Navbar, null)
              ), 
              React.createElement("div", {className: "col-sm-10"}, 
                this.props.children
              )
            )
          )
        )
      );
    }
  });


  // exports
  exports("Content", Content);
})();
