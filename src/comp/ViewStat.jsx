(function(){
  var AppConfig = require("../js/config.js");
  var AppProvider = require("../js/provider.js");

  var ViewStat = React.createClass({
    componentDidMount: function(prevProps, prevState){
      AppProvider.publish("update.navbar.activeItem", "stat");
      AppProvider.publish("update.Breadbar", {items: [{text: "查看统计"}]});
    },
    render: function(){
      return (
        <div className="main-panel g-viewManage">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">查看统计</h3>
            </div>
            <StatBody />
          </div>
        </div>
      );
    }
  });

  var StatBody = React.createClass({
    getInitialState: function() {
      return {
        data: null
      };
    },
    componentWillMount: function() {
      AppProvider.subscribe("update.StatBody", function(){
        this.refreshRender();
      }.bind(this));
      AppProvider.subscribe("work.created.StatBody", function(){
        AppProvider.publish("update.StatBody");
      });
      AppProvider.subscribe("work.updated.StatBody", function(){
        AppProvider.publish("update.StatBody");
      });
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.StatBody");
      AppProvider.unsubscribe("work.created.StatBody");
      AppProvider.unsubscribe("work.updated.StatBody");
      this.unmount = true;
    },
    componentDidMount: function() {
      this.refreshRender();
    },
    refreshRender: function(){
      AppProvider.queryWorkList(null, function(response){
        if(this.unmount){return;}
        if(response && response.err){
          return alert(response.err);
        }
        this.setState({data: response});
      }.bind(this));
    },
    render: function(){
      var data = this.state.data;

      return (
        <div className="panel-body">
          <StatData data={data} />
        </div>
      );
    }
  });


  var StatData = React.createClass({
    render: function(){

      var data = this.props.data;
      var countJava, countPhp, countPhython;

      countJava = countPhp = countPhython = 0;
      if(data && data.length){
        data.forEach(function(item){
          switch(item.department){
            case 1: countJava++;break;
            case 2: countPhp++;break;
            case 3: countPhython++;break;
          }
        });
      }

      return (
        <table className="table">
          <thead>
            <tr>
              <th>工作小组</th>
              <th>工作填报数量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Java小组</td>
              <td>{countJava}</td>
            </tr>
            <tr>
              <td>PHP小组</td>
              <td>{countPhp}</td>
            </tr>
            <tr>
              <td>Phython小组</td>
              <td>{countPhython}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  });

  // exports
  module.exports = ViewStat;
})();
