(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var Breadcrumb = require("Breadcrumb", "bootstrap");

  var Topbar = React.createClass({
    handleAdd: function(){

    },

    render: function(){
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <button className="btn btn-primary btn-block" onClick={this.handleAdd}>新增</button>
            </div>
            <div className="col-md-10">
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
      AppProvider.subscribe("update.Breadbar", function(data) {
        this.setState({items: data});
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.Breadbar");
    },
    render: function(){
      return (
        <Breadcrumb>
          <Breadcrumb.Item href="#" title="首页">首页</Breadcrumb.Item>
          {this.state.items.map(function(item, index){
            if(index === this.state.items.length-1){
              return <Breadcrumb.Item active title={item.text}>{item.text}</Breadcrumb.Item>
            }else{
              return <Breadcrumb.Item href={item.href} title={item.text}>{item.text}</Breadcrumb.Item>
            }
          }.bind(this))}
        </Breadcrumb>
      );
    }
  });

  // exports
  exports("Topbar", Topbar);
})();
