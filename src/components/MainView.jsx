(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Router = require('Router', "router");
  var IndexRoute = require('IndexRoute', "router");
  var Route = require('Route', "router");
  var hashHistory = require('hashHistory', "router");

  var Content = require('Content');
  var Home = require('Home');
  var Admin = require('Admin');
  var Message = require('Message');

  var MainView = React.createClass({
    render: function(){
      return (
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Content}>
              <IndexRoute component={Home} />
              <Route path="admin/:department" component={Admin} />
              <Route path="message" component={Message} />
            </Route>
          </Router>
        </div>
      );
    }
  });

  // exports
  exports("MainView", MainView);
})();
