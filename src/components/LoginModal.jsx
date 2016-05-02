(function(){
  var AppProvider = require("AppProvider", "window");

  var Modal = require("Modal", "bootstrap");

  var LoginModal = React.createClass({
    getInitialState: function(){
      return {showModal: false};
    },
    componentDidUpdate: function(prevProps, prevState){
      this.refs["LoginModal_username"].value = "";
      this.refs["LoginModal_pass"].value = "";
    },
    componentWillMount: function(){
      AppProvider.subscribe("change.LoginModal.show", function(data) {
        this.setState({showModal: !!data});
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("change.LoginModal");
    },
    close: function(){
      this.setState({showModal: false});
    },
    handleSubmit: function(){
      var username = this.refs["LoginModal_username"].value;
      AppProvider.saveLogin(username);
      AppProvider.publish("update.app.login");
      this.setState({showModal: false});
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
