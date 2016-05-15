(function(){
  var AppProvider = require("AppProvider", "window");

  var Modal = require("Modal", "bootstrap");

  var LoginModal = React.createClass({
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
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>登录</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="#" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="LoginModal_username">用户名</label>
                <input type="text" className="form-control" id="LoginModal_username" ref="LoginModal_username" placeholder="用户名" />
              </div>
              <div className="form-group">
                <label htmlFor="LoginModal_pass">密码</label>
                <input type="password" className="form-control" id="LoginModal_pass" ref="LoginModal_pass" placeholder="密码" />
              </div>
              <button className="btn btn-default">登录</button>
            </form>
          </Modal.Body>
        </Modal>
      );
    }
  });

  // exports
  exports("LoginModal", LoginModal);
})();
