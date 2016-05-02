(function(){
  var AppProvider = {
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

    postal: $({}),
    publish: function(channel, data){
      this.postal.trigger("react-admin-demo."+channel, data);
    },
    subscribe: function(channel, handler){
      this.postal.on("react-admin-demo."+channel, handler);
    },
    unsubscribe: function(channel, handler){
      this.postal.off("react-admin-demo."+channel, handler);
    },

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
      localStorage.setItem("react-admin-demo."+key, JSON.stringify(saveValue));
    },
    getStorageItem: function(key){
      var oriValue = localStorage.getItem("react-admin-demo."+key);
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
  window.AppProvider = AppProvider;
})();
