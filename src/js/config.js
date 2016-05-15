(function(){
  // App's Config
  var AppConfig = {
    // 产品配置
    appName: "后台管理系统",

    // 用语配置
    errNotLogined: "请先登录",
    errNoSuchData: "不存在此数据",

    // 前端模拟
    simDelay: 500,

    // 开发配置
    departmentStr: function(value){
      var str;
      switch(String(value)){
        case "1":
          str = "Java组"; break;
        case "2":
          str = "PHP组"; break;
        case "3":
          str = "Phython组"; break;
        default:
          str = value;
      }
      return str;
    },
    workTypeStr: function(value){
      var str;
      switch(String(value)){
        case "1":
          str = "项目开发"; break;
        case "2":
          str = "产品运维"; break;
        case "3":
          str = "技术积累"; break;
        default:
          str = value;
      }
      return str;
    }

  };

  module.exports = AppConfig;
})();
