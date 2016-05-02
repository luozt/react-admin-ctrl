(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Accordion = require("Accordion", "bootstrap");
  var Panel = require("Panel", "bootstrap");
  var ListGroup = require("ListGroup", "bootstrap");
  var ListGroupItem = require("ListGroupItem", "bootstrap");

  var Link = require("Link", "router");

  var Navbar = React.createClass({
    render: function(){
      return (
        <Accordion>
          <Panel header="管理员工工作" eventKey="1">
            <div className="list-group">
              <Link to="/admin/0" className="list-group-item">技术部</Link>
              <Link to="/admin/1" className="list-group-item">产品部</Link>
              <Link to="/admin/2" className="list-group-item">市场部</Link>
            </div>
          </Panel>
          <Panel header="管理系统消息" eventKey="2">
            <div className="list-group">
              <Link to="/message" className="list-group-item">消息列表</Link>
            </div>
          </Panel>
        </Accordion>
      );
    }
  });

  // exports
  exports("Navbar", Navbar);
})();
