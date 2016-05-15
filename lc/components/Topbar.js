(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");
  var Link = require('Link', "router");

  var Topbar = React.createClass({displayName: "Topbar",
    handleAdd: function(){
      AppProvider.publish("update.WorkForm.visibility", true);
    },

    render: function(){
      return (
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-sm-2"}, 
              React.createElement("button", {className: "btn btn-primary btn-block", onClick: this.handleAdd}, "新增")
            ), 
            React.createElement("div", {className: "col-sm-10"}, 
              React.createElement(Breadbar, null)
            )
          )
        )
      );
    }
  });

  var Breadbar = React.createClass({displayName: "Breadbar",
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
        React.createElement("ol", {className: "breadcrumb"}, 
          React.createElement("li", null, React.createElement(Link, {to: "/"}, "首页")), 
          
            this.state.items.map(function(item, index){
              if(index === lastIndex){
                return React.createElement("li", {key: index}, React.createElement("a", null, item.text));
              }else{
                return React.createElement("li", {key: index}, React.createElement(Link, {to: item.href}, item.text));
              }
            }.bind(this))
          
        )
      );
    }
  });

  // exports
  exports("Topbar", Topbar);
})();
