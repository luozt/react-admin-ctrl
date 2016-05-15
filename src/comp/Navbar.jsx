(function(){
  var AppConfig = require("../js/config.js");
  var AppProvider = require("../js/provider.js");

  var Accordion = ReactBootstrap.Accordion;
  var Panel = ReactBootstrap.Panel;
  var ListGroup = ReactBootstrap.ListGroup;
  var ListGroupItem = ReactBootstrap.ListGroupItem;

  var Link = ReactRouter.Link;

  var Navbar = React.createClass({
    getInitialState: function() {
      return {
        activeItem: "home"
      };
    },
    componentWillMount: function(){
      AppProvider.subscribe("update.navbar.activeItem", function(event, data) {
        this.setState({activeItem: data});
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.navbar.activeItem");
    },
    render: function(){
      var expandedPane,
        activeItem = this.state.activeItem;

      switch(activeItem){
        case "manage":
        case "stat":
          expandedPane = 0;
          break;
        case "message":
          expandedPane = 1;
          break;
      }

      return (
        <Accordion>
          <Panel header="管理员工工作" eventKey="1">
            <div className="list-group">
              <Link to="/manage"
                className={"manage" === this.state.activeItem ? "list-group-item active" : "list-group-item"}>工作管理</Link>
              <Link to="/stat"
                className={"stat" === this.state.activeItem ? "list-group-item active" : "list-group-item"}>查看统计</Link>
            </div>
          </Panel>
          <Panel header="管理系统消息" eventKey="2">
            <div className="list-group">
              <Link to="/message"
                className={"message" === this.state.activeItem ? "list-group-item active" : "list-group-item"}>消息列表</Link>
            </div>
          </Panel>
        </Accordion>
      );
    }
  });

  // exports
  module.exports = Navbar;
})();
