(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Router = require('Router', "router");
  var IndexRoute = require('IndexRoute', "router");
  var Route = require('Route', "router");
  var hashHistory = require('hashHistory', "router");

  var Content = require('Content');
  var ViewHome = require('ViewHome');
  var ViewStat = require('ViewStat');
  var ViewManage = require('ViewManage');
  var ViewMessage = require('ViewMessage');

  var Banner = require("Banner");
  var LoginModal = require("LoginModal");
  var WorkForm = require("WorkForm");
  var Topbar = require("Topbar");

  var MainView = React.createClass({displayName: "MainView",
    render: function(){
      return (
        React.createElement("div", null, 
          React.createElement(Banner, null), 
          React.createElement(Router, {history: hashHistory}, 
            React.createElement(Route, {path: "/", component: Content}, 
              React.createElement(IndexRoute, {component: ViewHome}), 
              React.createElement(Route, {path: "manage", component: ViewManage}), 
              React.createElement(Route, {path: "stat", component: ViewStat}), 
              React.createElement(Route, {path: "message", component: ViewMessage})
            )
          ), 
          React.createElement(LoginModal, null), 
          React.createElement(WorkForm, null)
        )
      );
    }
  });

  // exports
  exports("MainView", MainView);
})();
