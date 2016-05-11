(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");

  var ViewStat = React.createClass({displayName: "ViewStat",
    componentDidMount: function(prevProps, prevState){
      AppProvider.publish("update.navbar.activeItem", "stat");
      AppProvider.publish("update.Breadbar", {items: [{text: "查看统计"}]});
    },
    render: function(){
      return (
        React.createElement("div", {className: "main-panel g-viewManage"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, 
              React.createElement("h3", {className: "panel-title"}, "查看统计")
            ), 
            React.createElement(StatBody, null)
          )
        )
      );
    }
  });

  var StatBody = React.createClass({displayName: "StatBody",
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
        React.createElement("div", {className: "panel-body"}, 
          React.createElement(StatData, {data: data})
        )
      );
    }
  });


  var StatData = React.createClass({displayName: "StatData",
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
        React.createElement("table", {className: "table"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "工作小组"), 
              React.createElement("th", null, "工作填报数量")
            )
          ), 
          React.createElement("tbody", null, 
            React.createElement("tr", null, 
              React.createElement("td", null, "Java小组"), 
              React.createElement("td", null, countJava)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "PHP小组"), 
              React.createElement("td", null, countPhp)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Phython小组"), 
              React.createElement("td", null, countPhython)
            )
          )
        )
      );
    }
  });

  // exports
  exports("ViewStat", ViewStat);
})();
