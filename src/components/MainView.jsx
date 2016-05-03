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

  var MainView = React.createClass({
    render: function(){
      return (
        <div>
          <Banner />
          <Router history={hashHistory}>
            <Route path="/" component={Content}>
              <IndexRoute component={ViewHome} />
              <Route path="manage" component={ViewManage} />
              <Route path="stat" component={ViewStat} />
              <Route path="message" component={ViewMessage} />
            </Route>
          </Router>
          <LoginModal />
          <WorkForm />
        </div>
      );
    }
  });

  // exports
  exports("MainView", MainView);
})();
