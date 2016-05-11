(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Banner = React.createClass({displayName: "Banner",
    render: function(){
      var appName = AppConfig.appName;

      return (
        React.createElement("div", {className: "navbar navbar-inverse"}, 
          React.createElement("div", {className: "container"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("button", {className: "navbar-toggle collapsed", 
                "data-toggle": "collapse", 
                "data-target": "#navbar_collapse"}, 
                React.createElement("span", {className: "sr-only"}, "切换折叠"), 
                React.createElement("span", {className: "icon-bar"}), 
                React.createElement("span", {className: "icon-bar"}), 
                React.createElement("span", {className: "icon-bar"})
              ), 
              React.createElement("a", {className: "navbar-brand"}, appName)
            ), 

            React.createElement("nav", {id: "navbar_collapse", className: "navbar-collapse collapse"}, 
              React.createElement(BannerLogin, null)
            )
          )
        )
      )
    }
  });

  var BannerLogin = React.createClass({displayName: "BannerLogin",
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
          React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
            React.createElement("li", null, 
              React.createElement("a", null, this.state.username)
            ), 
            React.createElement("li", null, 
              React.createElement("a", {href: "javascript:;", onClick: this.handleLogout}, "退出")
            )
          )
        ) : (
          React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
            React.createElement("li", null, 
              React.createElement("a", {href: "javascript:;", onClick: this.handleLogin}, "登录")
            )
          )
        );

      return loginHtml;
    }
  });

  // exports
  exports("Banner", Banner);
})();
