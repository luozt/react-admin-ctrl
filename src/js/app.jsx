(function(){
  var Banner = require("Banner");
  var LoginModal = require("LoginModal");
  var Topbar = require("Topbar");
  var MainView = require("MainView");

  var App = React.createClass({
    render: function(){
      return (
        <div>
          <Banner />
          <LoginModal />
          <Topbar />
          <MainView />
        </div>
      );
    }
  });

  ReactDOM.render(
    <App />
    , document.getElementById("container")
  );

})();
