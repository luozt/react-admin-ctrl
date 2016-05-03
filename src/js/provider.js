(function(){
  var AppConfig = require("AppConfig", "globals");

  var workerValidateFilterSrc = __uri("worker_validate_filter.js"), workerValidateFilter;

  var AppProvider = {
    /**
    *用户登录信息操作
    */
    isLogined: function(){
      var username = this.getStorageItem("login.username");
      return !!username;
    },
    getLogin: function(){
      return this.getStorageItem("login.username");
    },
    saveLogin: function(username){
      this.setStorageItem("login.username", username);
    },
    clearLogin: function(username){
      this.setStorageItem("login.username", null);
    },

    /**
    *操作员工工作量API
    */
    // 查询员工工作列表
    // @filter: {author, department, workType, startTime, endTime, keywords}
    queryWorkList: function(filter, callback){
      var callback = callback || function(){};

      var filter = $.extend(true, {
        department: 0,
        workType: 0
      }, filter);

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var origData = this.getStorageItem("database.work") || {};

        if("undefined" !== typeof Worker){
          if(!workerValidateFilter){
            workerValidateFilter = new Worker(workerValidateFilterSrc);
          }

          workerValidateFilter.postMessage(JSON.stringify({
            filter: filter,
            origData: origData
          }));

          workerValidateFilter.onmessage = function(event){
            var result = JSON.parse(event.data);
            callback(result.length ? result : null);
            workerValidateFilter.terminate();
            workerValidateFilter = null;
          };
        }else{
          var handleData = function (filter, origData) {
            var result = [];

            var curData, reKeywords, isMatch;

            for (var key in origData) {
              curData = origData[key];
              if (filter.author && curData.author !== filter.author) {
                continue;
              }
              if (0 !== filter.department && curData.department !== filter.department) {
                continue;
              }
              if (0 !== filter.workType && curData.workType !== filter.workType) {
                continue;
              }
              if (filter.startTime && !(filter.startTime <= curData.createTime)) {
                continue;
              }
              if (filter.endTime && !(filter.endTime >= curData.createTime)) {
                continue;
              }
              if (filter.keywords) {
                reKeywords = new RegExp(filter, "i");
                isMatch = false;
                if (reKeywords.test(curData.author) ||
                  reKeywords.test(curData.name) ||
                  reKeywords.test(curData.content)
                ) {
                  isMatch = true;
                }
                if (!isMatch) {
                  continue;
                }
              }
              result.push(curData);
            }

            return result;
          };

          var result = handleData(filter, origData);

          callback(result.length ? result : null);
        }
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },

    // 获取指定的员工工作
    getWork: function(id, callback){
      var callback = callback || function(){};

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var origData = this.getStorageItem("database.work") || {};

        var distWork = origData[id];

        if(distWork){
          callback(distWork);
        }else{
          callback({err: AppConfig.errNoSuchData});
        }
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },

    // 填报员工工作
    // @work: {name, department, workType, content}
    createWork: function(work, callback){
      var callback = callback || function(){};

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var origData = this.getStorageItem("database.work") || {};
        var id = Math.guid();
        var nowValue = (new Date()).valueOf();
        var saveWork = $.extend(true, {
          createTime: nowValue
        }, work, {
          id: id,
          author: username,
          updateTime: nowValue
        });
        origData[id] = saveWork;

        this.setStorageItem("database.work", origData);
        callback(saveWork);
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },

    // 更新员工工作
    // @work: {id, name, department, workType, content}
    updateWork: function(work, callback){
      var callback = callback || function(){};

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var id = work ? work.id : null;
        var origData = this.getStorageItem("database.work") || {};
        var origWork = origData[id];

        if(!origWork){
          return callback({err: AppConfig.errNoSuchData});
        }

        origData[id] = $.extend(true, origWork, work, {
          author: username,
          updateTime: (new Date()).valueOf()
        });

        this.setStorageItem("database.work", origData);
        callback(origWork);
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },

    // 删除员工工作
    deleteWork: function(id, callback){
      var callback = callback || function(){};

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var origData = this.getStorageItem("database.work") || {};
        var origWork = origData[id];

        if(!origWork){
          return callback({err: AppConfig.errNoSuchData});
        }

        origData[id] = null;
        delete origData[id];

        this.setStorageItem("database.work", origData);

        callback(id);
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },

    /**
    * 消息列表
    */
    queryMessageList: function(callback){
      var callback = callback || function(){};

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var origData = this.getStorageItem("database.message") || {};
        var arrData = [];

        for(var key in origData){
          arrData.push(origData[key]);
        }

        callback(arrData);
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },
    // 保存消息内容
    // @msg: string
    createMessage: function(msg, callback){
      var callback = callback || function(){};

      var mainFunc = function(){
        var username = this.getLogin();

        if(!username){
          return callback({err: AppConfig.errNotLogined});
        }

        var origData = this.getStorageItem("database.message") || {};
        var nowValue = (new Date()).valueOf();
        var id = Math.guid();
        var saveData = {
          id: id,
          msg: msg,
          createTime: nowValue,
          updateTime: nowValue
        };
        origData[id] = saveData;

        this.setStorageItem("database.message", origData);
        callback(saveData);
      }.bind(this);

      setTimeout(mainFunc, AppConfig.simDelay);
    },

    /**
    *订阅/发布事件
    */
    postal: $({}),
    publish: function(channel, data){
      this.postal.trigger("react-admin-ctrl."+channel, data);
    },
    subscribe: function(channel, handler){
      this.postal.on("react-admin-ctrl."+channel, handler);
    },
    unsubscribe: function(channel, handler){
      this.postal.off("react-admin-ctrl."+channel, handler);
    },

    // 封装的保存数据操作
    setStorageItem: function(key, value){
      var saveValue;
      if("object" === typeof value && null !== value){
        saveValue = {
          stringify: true,
          realValue: JSON.stringify(value)
        };
      }else{
        saveValue = {
          stringify: false,
          realValue: value
        }
      }
      localStorage.setItem("react-admin-ctrl."+key, JSON.stringify(saveValue));
    },
    getStorageItem: function(key){
      var oriValue = localStorage.getItem("react-admin-ctrl."+key);
      if(!oriValue){return oriValue;}
      var saveValue = JSON.parse(oriValue);
      var realValue;
      if(saveValue.stringify){
        realValue = JSON.parse(saveValue.realValue);
      }else{
        realValue = saveValue.realValue;
      }
      return realValue;
    }
  };

  // exports
  window.__Globals__.AppProvider = AppProvider;
})();
