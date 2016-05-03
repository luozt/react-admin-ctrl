(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");
  var Link = require('Link', "router");

  var Topbar = React.createClass({
    handleAdd: function(){
      AppProvider.publish("update.WorkForm.visibility", true);
    },

    render: function(){
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <button className="btn btn-primary btn-block" onClick={this.handleAdd}>新增</button>
            </div>
            <div className="col-sm-10">
              <Breadbar />
            </div>
          </div>
        </div>
      );
    }
  });

  var Breadbar = React.createClass({
    getInitialState: function(){
      return {
        items: []
      };
    },
    componentWillMount: function(){
      // @data: [{href: String, text: String}]
      AppProvider.subscribe("update.Breadbar", function(event, data) {
        this.setState(data);
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.Breadbar");
    },
    render: function(){
      var lastIndex = this.state.items.length-1;
      return (
        <ol className="breadcrumb">
          <li><Link to="/">首页</Link></li>
          {
            this.state.items.map(function(item, index){
              if(index === lastIndex){
                return <li key={index}><a>{item.text}</a></li>;
              }else{
                return <li key={index}><Link to={item.href}>{item.text}</Link></li>;
              }
            }.bind(this))
          }
        </ol>
      );
    }
  });

  // exports
  exports("Topbar", Topbar);
})();
