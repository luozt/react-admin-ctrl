(function(){
  var AppConfig = require("AppConfig", "globals");
  var AppProvider = require("AppProvider", "globals");
  var Helper = require("Helper", "globals");

  var Datepicker = require("Datepicker");

  var ViewManage = React.createClass({displayName: "ViewManage",
    componentDidMount: function(prevProps, prevState){
      AppProvider.publish("update.navbar.activeItem", "manage");
      AppProvider.publish("update.Breadbar",  {items: [{text: "工作管理"}]});
    },
    render: function(){
      return (
        React.createElement("div", {className: "main-panel g-viewManage"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, 
              React.createElement("h3", {className: "panel-title"}, "工作管理")
            ), 
            React.createElement("div", {className: "panel-body"}, 
              React.createElement(Filter, null), 
              React.createElement(Datalist, null)
            )
          )
        )
      );
    }
  });

  var Filter = React.createClass({displayName: "Filter",
    handleQuery: function(){
      var filter = {};

      filter.author = this.refs.author.value;
      filter.department = Number(this.refs.department.value);
      filter.workType = Number(this.refs.workType.value);
      filter.keywords = this.refs.keywords.value;

      var startTimeVal = this.refs.startTime.getValue(),
        endTimeVal = this.refs.endTime.getValue();

      if(startTimeVal){
        filter.startTime = (new Date(startTimeVal)).valueOf() || null;
      }
      if(endTimeVal){
        // 结束时间应包含当天的时间，故添加24小时
        filter.endTime = ((new Date(endTimeVal)).valueOf()+1000*60*60*24) || null;
      }

      AppProvider.queryWorkList(filter, function(response){
        if(response && response.err){
          return alert(response.err);
        }
        AppProvider.publish("update.DatalistBody", {data: response});
      });
    },
    handleReset: function(){
      this.refs.author.value = "";
      this.refs.department.value = 0;
      this.refs.workType.value = 0;
      this.refs.startTime.reset();
      this.refs.endTime.reset();
      this.refs.keywords.value = "";
    },
    render: function(){
      return (
        React.createElement("div", {className: "well"}, 
          React.createElement("div", {className: "form-inline l-filter"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, "填报人："), 
                  React.createElement("input", {type: "text", className: "form-control", placeholder: "请填写填报人", ref: "author"})
                )
              ), 
              React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, "所属小组："), 
                  React.createElement("select", {className: "form-control", ref: "department"}, 
                    React.createElement("option", {value: "0"}, "--全部--"), 
                    React.createElement("option", {value: "1"}, "Java组"), 
                    React.createElement("option", {value: "2"}, "PHP组"), 
                    React.createElement("option", {value: "3"}, "Phython组")
                  )
                )
              ), 
              React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, "工作类别："), 
                  React.createElement("select", {className: "form-control", ref: "workType"}, 
                    React.createElement("option", {value: "0"}, "--全部--"), 
                    React.createElement("option", {value: "1"}, "项目开发"), 
                    React.createElement("option", {value: "2"}, "产品运维"), 
                    React.createElement("option", {value: "3"}, "技术积累")
                  )
                )
              )
            ), 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, "填报开始日期："), 
                  React.createElement(Datepicker, {className: "form-control", 
                    id: "ViewManage_startTime", 
                    another: "ViewManage_endTime", 
                    pickerType: "start", ref: "startTime"})
                )
              ), 
              React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, "填报结束日期："), 
                  React.createElement(Datepicker, {className: "form-control", 
                    id: "ViewManage_endTime", 
                    another: "ViewManage_startTime", 
                    pickerType: "end", ref: "endTime"})
                )
              ), 
              React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "form-group"}, 
                  React.createElement("label", null, "搜索关键字："), 
                  React.createElement("input", {type: "text", className: "form-control", placeholder: "搜索填报人、姓名、工作内容", ref: "keywords"})
                )
              )
            )
          ), 
          React.createElement("div", {className: "text-center"}, 
            React.createElement("button", {className: "btn btn-primary u-gap10", onClick: this.handleQuery}, "查询"), 
            React.createElement("button", {className: "btn btn-default u-gap10", onClick: this.handleReset}, "重置")
          )
        )
      );
    }
  });

  var Datalist = React.createClass({displayName: "Datalist",
    render: function(){
      return (
        React.createElement("div", {className: "table-responsive"}, 
          React.createElement("table", {className: "table table-bordered table-hover"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null, "#"), 
                React.createElement("th", null, "填报人"), 
                React.createElement("th", null, "姓名"), 
                React.createElement("th", null, "所属小组"), 
                React.createElement("th", null, "工作类别"), 
                React.createElement("th", null, "填报日期"), 
                React.createElement("th", null, "操作")
              )
            ), 
            React.createElement(DatalistBody, null)
          )
        )
      );
    }
  });

  var DatalistBody = React.createClass({displayName: "DatalistBody",

    getInitialState: function() {
      return {
        data: null
      };
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

    componentWillMount: function(){
      AppProvider.subscribe("update.DatalistBody", function(event, data){
        if(!data){
          this.refreshRender();
        }else{
          this.setState(data);
        }
      }.bind(this));

      AppProvider.subscribe("work.created.DatalistBody", function(){
        AppProvider.publish("update.DatalistBody");
      });
      AppProvider.subscribe("work.updated.DatalistBody", function(){
        AppProvider.publish("update.DatalistBody");
      });
    },

    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.DatalistBody");
      AppProvider.unsubscribe("work.created.DatalistBody");
      AppProvider.unsubscribe("work.updated.DatalistBody");
      this.unmount = true;
    },

    componentDidMount: function(){
      this.refreshRender();
    },

    render: function(){
      return (
        React.createElement("tbody", null, 
        
          this.state.data && this.state.data.length ?
          this.state.data.map(function(item, index){
            return (
              React.createElement(DataItem, React.__spread({key: item.id},  item, {index: index, refreshList: this.refreshRender}))
            );
          }.bind(this)) : React.createElement("tr", null, React.createElement("td", {colSpan: "7"}, "暂无数据"))
        
        )
      );
    }
  });

  var DataItem = React.createClass({displayName: "DataItem",
    handleView: function(){
      AppProvider.publish("update.WorkForm", {id: this.props.id, showModal: true, isView: true});
    },
    handleUpdate: function(){
      AppProvider.publish("update.WorkForm", {id: this.props.id, showModal: true, isView: false});
    },
    handleDelete: function(){
      if(this.submitting){
        return;
      }
      if(window.confirm("确定删除此工作："+this.props.name+"-"+AppConfig.workTypeStr(this.props.workType)+"？")){
        this.submitting = true;
        AppProvider.deleteWork(this.props.id, function(response){
          this.submitting = false;
          if(response && response.err){return alert(response.err);}
          this.props.refreshList();
        }.bind(this));
      }
    },
    render: function(){
      return (
        React.createElement("tr", null, 
          React.createElement("td", null, this.props.index+1), 
          React.createElement("td", null, this.props.author), 
          React.createElement("td", null, this.props.name), 
          React.createElement("td", null, AppConfig.departmentStr(this.props.department)), 
          React.createElement("td", null, AppConfig.workTypeStr(this.props.workType)), 
          React.createElement("td", null, Helper.time2str(this.props.createTime)), 
          React.createElement("td", null, 
            React.createElement("button", {className: "btn btn-sm btn-default u-gapLeftRight2", onClick: this.handleView}, "查看"), 
            React.createElement("button", {className: "btn btn-sm btn-default u-gapLeftRight2", onClick: this.handleUpdate}, "修改"), 
            React.createElement("button", {className: "btn btn-sm btn-default u-gapLeftRight2", onClick: this.handleDelete}, "删除")
          )
        )
      );
    }
  });

  // exports
  exports("ViewManage", ViewManage);
})();
