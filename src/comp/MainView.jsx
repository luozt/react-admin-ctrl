(function(){
  var AppConfig = require("../js/config.js");
  var AppProvider = require("../js/provider.js");

  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;
  var Route = ReactRouter.Route;
  var hashHistory = ReactRouter.hashHistory;

  var Content = require('./Content.jsx');
  var ViewHome = require('./ViewHome.jsx');
  var ViewStat = require('./ViewStat.jsx');
  var ViewManage = require('./ViewManage.jsx');
  var ViewMessage = require('./ViewMessage.jsx');

  var Banner = require("./Banner.jsx");
  var LoginModal = require("./LoginModal.jsx");
  var WorkForm = require("./WorkForm.jsx");
  var Topbar = require("./Topbar.jsx");

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
  module.exports = MainView;
})();
