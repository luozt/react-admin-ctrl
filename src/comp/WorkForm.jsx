(function(){

  var AppConfig = require("../js/config.js");
  var AppProvider = require("../js/provider.js");

  var Modal = ReactBootstrap.Modal;

  var WorkForm = React.createClass({
    getInitialState:function() {
      return {
        id: null,
        showModal: false,
        isView: false
      };
    },
    componentWillMount: function(){
      AppProvider.subscribe("update.WorkForm.visibility", function(event, data) {
        this.setState({showModal: !!data});
      }.bind(this));
      AppProvider.subscribe("update.WorkForm", function(event, data){
        this.setState(data);
      }.bind(this));
    },
    componentWillUnmount: function() {
      AppProvider.unsubscribe("update.WorkForm");
    },
    componentDidUpdate: function(prevProps, prevState) {
      if(this.state.id){
        AppProvider.getWork(this.state.id, function(response){
          if(response && response.err){return alert(response.err);}
          if(!this.refs.wrapper){return;}
          if(this.state.isView){
            this.refs.nameStatic.innerHTML = response.name;
            this.refs.departmentStatic.innerHTML = AppConfig.departmentStr(response.department);
            this.refs.workTypeStatic.innerHTML = AppConfig.workTypeStr(response.workType);
            this.refs.contentStatic.innerHTML = response.content;
          }else{
            this.refs.name.value = response.name;
            this.refs.department.value = response.department;
            this.refs.workType.value = response.workType;
            this.refs.content.value = response.content;
          }
        }.bind(this));
      }
    },
    close: function(){
      if(this.state.isView || window.confirm("关闭将丢失当前编辑内容，确定继续？")){
        this.setState(this.getInitialState());
      }
    },
    handleSubmit: function(){
      if(this.submitting){
        return;
      }
      var formData = {
        name: this.refs.name.value,
        department: Number(this.refs.department.value),
        workType: Number(this.refs.workType.value),
        content: this.refs.content.value
      };
      var invoFunc;

      if(!$.trim(formData.name)){
        return alert("请输入姓名");
      }
      if(!$.trim(formData.content)){
        return alert("请输入工作内容");
      }

      this.submitting = true;

      // 修改工作
      if(this.state.id){
        formData.id = this.state.id;
        invoFunc = "updateWork";
      }
      // 创建工作
      else{
        invoFunc = "createWork";
      }
      AppProvider[invoFunc](formData, function(response){
        this.submitting = false;

        if(response && response.err){
          return alert(response.err);
        }
        this.setState({showModal: false});

        // 通知所有组件，新工作被填报
        if("createWork" === invoFunc){
          AppProvider.publish("work.created");
        }else{
          AppProvider.publish("work.updated");
        }
      }.bind(this));
    },
    render: function(){
      var id = this.state.id;
      var title;
      var isView = !!this.state.isView;

      if(isView){
        title = "查看员工工作";
      }else{
        title = id ? "修改员工工作" : "填报员工工作";
      }

      return (
        <Modal bsSize="large" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-horizontal" ref="wrapper">
              <div className="form-group">
                <label className="col-sm-2 control-label">姓名：</label>
                <div className="col-sm-10">
                  {
                    isView
                    ? <p className="form-control-static" ref="nameStatic"></p>
                    : <input className="form-control" type="text" placeholder="输入姓名" ref="name" />
                  }
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">小组：</label>
                <div className="col-sm-10">
                  {
                    isView
                    ? <p className="form-control-static" ref="departmentStatic"></p>
                    : (
                      <select className="form-control" ref="department">
                        <option value="1">Java组</option>
                        <option value="2">PHP组</option>
                        <option value="3">Phython组</option>
                      </select>
                    )
                  }
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">工作类别：</label>
                <div className="col-sm-10">
                  {
                    isView
                    ? <p className="form-control-static" ref="workTypeStatic"></p>
                    : (
                      <select className="form-control" ref="workType">
                        <option value="1">项目开发</option>
                        <option value="2">产品运维</option>
                        <option value="3">技术积累</option>
                      </select>
                    )
                  }
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">工作内容：</label>
                <div className="col-sm-10">
                  {
                    isView
                    ? <p className="form-control-static" ref="contentStatic"></p>
                    : <textarea className="form-control" placeholder="输入工作内容" ref="content"></textarea>
                  }
                </div>
              </div>
              {
                isView
                ? ""
                : (
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <a className="btn btn-primary" onClick={this.handleSubmit}>提交</a>
                  </div>
                </div>
                )
              }
            </div>
          </Modal.Body>
        </Modal>
      );
    }
  });

  module.exports = WorkForm;
})();
