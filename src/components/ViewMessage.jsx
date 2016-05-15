(function(){
  var AppConfig = require("AppConfig", "globals");
  var AppProvider = require("AppProvider", "globals");
  var Helper = require("Helper", "globals");

  var ViewMessage = React.createClass({
    componentDidMount: function() {
      AppProvider.publish("update.navbar.activeItem", "message");
      AppProvider.publish("update.Breadbar", {items: [{text: "消息列表"}]});
    },
    render: function(){
      return (
        <div className="main-panel g-viewManage">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">消息列表</h3>
            </div>
            <MessageBody />
          </div>
        </div>
      );
    }
  });

  var MessageBody = React.createClass({
    render: function(){
      return (
        <div className="panel-body">
          <p className="text-info">每个随机10秒会接收到服务器端推送的消息：</p>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>消息接收时间</th>
                <th>消息内容</th>
              </tr>
            </thead>
            <MessageListBody />
          </table>
        </div>
      );
    }
  });

  var MessageListBody = React.createClass({
    getInitialState: function() {
      return {
        data: null
      };
    },

    refreshRender: function(){
      AppProvider.queryMessageList(function(response){
        if(this.unmount){return;}
        if(response && response.err){
          return alert(response.err);
        }
        this.setState({data: response});
      }.bind(this));
    },

    componentWillMount: function(){
      AppProvider.subscribe("update.ViewMessage", function(){
        this.refreshRender();
      }.bind(this));
    },

    componentWillUnmount: function(){
      AppProvider.unsubscribe("update.ViewMessage");
      this.unmount = true;
    },

    componentDidMount: function(){
      this.refreshRender();
    },

    render: function(){
      return (
        <tbody>
        {
          this.state.data && this.state.data.length ?
          this.state.data.map(function(item, index){
            return (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td>{Helper.time2str(item.createTime, "sec")}</td>
                <td>{item.msg}</td>
              </tr>
            );
          }.bind(this)) : <tr><td colSpan="3">暂无数据</td></tr>
        }
        </tbody>
      );
    }
  });

  // exports
  exports("ViewMessage", ViewMessage);
})();
