(function(){
  var AppConfig = require("AppConfig", "globals");
  var AppProvider = require("AppProvider", "globals");
  var Helper = require("Helper", "globals");

  var Datepicker = require("Datepicker");

  var ViewManage = React.createClass({
    componentDidMount: function(prevProps, prevState){
      AppProvider.publish("update.navbar.activeItem", "manage");
      AppProvider.publish("update.Breadbar",  {items: [{text: "工作管理"}]});
    },
    render: function(){
      return (
        <div className="main-panel g-viewManage">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">工作管理</h3>
            </div>
            <div className="panel-body">
              <Filter />
              <Datalist />
            </div>
          </div>
        </div>
      );
    }
  });

  var Filter = React.createClass({
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
        <div className="well">
          <div className="form-inline l-filter">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>填报人：</label>
                  <input type="text" className="form-control" placeholder="请填写填报人" ref="author" />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>所属小组：</label>
                  <select className="form-control" ref="department">
                    <option value="0">--全部--</option>
                    <option value="1">Java组</option>
                    <option value="2">PHP组</option>
                    <option value="3">Phython组</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>工作类别：</label>
                  <select className="form-control" ref="workType">
                    <option value="0">--全部--</option>
                    <option value="1">项目开发</option>
                    <option value="2">产品运维</option>
                    <option value="3">技术积累</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>填报开始日期：</label>
                  <Datepicker className="form-control"
                    id="ViewManage_startTime"
                    another="ViewManage_endTime"
                    pickerType="start" ref="startTime" />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>填报结束日期：</label>
                  <Datepicker className="form-control"
                    id="ViewManage_endTime"
                    another="ViewManage_startTime"
                    pickerType="end" ref="endTime" />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>搜索关键字：</label>
                  <input type="text" className="form-control" placeholder="搜索填报人、姓名、工作内容" ref="keywords" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary u-gap10" onClick={this.handleQuery}>查询</button>
            <button className="btn btn-default u-gap10" onClick={this.handleReset}>重置</button>
          </div>
        </div>
      );
    }
  });

  var Datalist = React.createClass({
    render: function(){
      return (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>填报人</th>
                <th>姓名</th>
                <th>所属小组</th>
                <th>工作类别</th>
                <th>填报日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <DatalistBody />
          </table>
        </div>
      );
    }
  });

  var DatalistBody = React.createClass({

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
        <tbody>
        {
          this.state.data && this.state.data.length ?
          this.state.data.map(function(item, index){
            return (
              <DataItem key={item.id} {...item} index={index} refreshList={this.refreshRender} />
            );
          }.bind(this)) : <tr><td colSpan="7">暂无数据</td></tr>
        }
        </tbody>
      );
    }
  });

  var DataItem = React.createClass({
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
        <tr>
          <td>{this.props.index+1}</td>
          <td>{this.props.author}</td>
          <td>{this.props.name}</td>
          <td>{AppConfig.departmentStr(this.props.department)}</td>
          <td>{AppConfig.workTypeStr(this.props.workType)}</td>
          <td>{Helper.time2str(this.props.createTime)}</td>
          <td>
            <button className="btn btn-sm btn-default u-gapLeftRight2" onClick={this.handleView}>查看</button>
            <button className="btn btn-sm btn-default u-gapLeftRight2" onClick={this.handleUpdate}>修改</button>
            <button className="btn btn-sm btn-default u-gapLeftRight2" onClick={this.handleDelete}>删除</button>
          </td>
        </tr>
      );
    }
  });

  // exports
  exports("ViewManage", ViewManage);
})();
