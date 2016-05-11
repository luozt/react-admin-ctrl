(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Banner = React.createClass({
    render: function(){
      var appName = AppConfig.appName;

      return (
        <div className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar_collapse">
                <span className="sr-only">切换折叠</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand">{appName}</a>
            </div>

            <nav id="navbar_collapse" className="navbar-collapse collapse">
              <BannerLogin />
            </nav>
          </div>
        </div>
      )
    }
  });

  var BannerLogin = React.createClass({
    getInitialState: function(){
      return {
        isLogined: false,
        username: null
      };
    },
    componentWillMount: function(){
      this.setState({
        isLogined: AppProvider.isLogined(),
        username: AppProvider.getLogin()
      });
      AppProvider.subscribe("update.app.login.banner", function(){
        this.setState({
          isLogined: AppProvider.isLogined(),
          username: AppProvider.getLogin()
        });
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.app.login.banner");
    },
    handleLogout: function(){
      AppProvider.clearLogin();
      this.setState({
        isLogined: AppProvider.isLogined(),
        username: AppProvider.getLogin()
      });
    },
    handleLogin: function(){
      AppProvider.publish("update.LoginModal.visibility", true);
    },
    render: function(){
      var isLogined = this.state.isLogined;

      var loginHtml = this.state.isLogined ? (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a>{this.state.username}</a>
            </li>
            <li>
              <a href="javascript:;" onClick={this.handleLogout}>退出</a>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="javascript:;" onClick={this.handleLogin}>登录</a>
            </li>
          </ul>
        );

      return loginHtml;
    }
  });

  // exports
  exports("Banner", Banner);
})();
