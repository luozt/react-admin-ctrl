(function(){
  var AppProvider = require("AppProvider", "window");

  var Modal = require("Modal", "bootstrap");

  var LoginModal = React.createClass({displayName: "LoginModal",
    getInitialState: function(){
      return {showModal: false};
    },
    componentWillMount: function(){
      AppProvider.subscribe("update.LoginModal.visibility", function(event, data) {
        this.setState({showModal: !!data});
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.LoginModal");
    },
    close: function(){
      this.setState({showModal: false});
    },
    handleSubmit: function(e){
      var username = this.refs["LoginModal_username"].value;
      AppProvider.saveLogin(username);
      AppProvider.publish("update.app.login");
      this.setState({showModal: false});
      e.preventDefault();
    },
    render: function(){
      return (
        React.createElement(Modal, {show: this.state.showModal, onHide: this.close}, 
          React.createElement(Modal.Header, {closeButton: true}, 
            React.createElement(Modal.Title, null, "登录")
          ), 
          React.createElement(Modal.Body, null, 
            React.createElement("form", {action: "#", onSubmit: this.handleSubmit}, 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", {htmlFor: "LoginModal_username"}, "用户名"), 
                React.createElement("input", {type: "text", className: "form-control", id: "LoginModal_username", ref: "LoginModal_username", placeholder: "用户名"})
              ), 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", {htmlFor: "LoginModal_pass"}, "密码"), 
                React.createElement("input", {type: "password", className: "form-control", id: "LoginModal_pass", ref: "LoginModal_pass", placeholder: "密码"})
              ), 
              React.createElement("button", {className: "btn btn-default"}, "登录")
            )
          )
        )
      );
    }
  });

  // exports
  exports("LoginModal", LoginModal);
})();
