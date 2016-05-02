(function(){
  if("undefined" !== typeof require){
    window._require = require;
  }
  if("undefined" !== typeof exports){
    window._exports = exports;
  }

  window.Components = {};

  window.require = function(module, source){
    var dist;
    switch(source){
      case undefined:
        dist = window.Components[module];
        break;
      case "bootstrap":
        dist = ReactBootstrap[module];
        break;
      case "router":
        dist = ReactRouter[module];
        break;
      case "window":
        dist = window[module];
        break;
      default:
        dist = null;
    }
    if(null === dist || undefined === dist){
      throw new Error("no such module... where require module is "+ module + ", source is " + source);
    }
    return dist;
  };

  window.exports = function(module, result){
    window.Components[module] = result;
  };
})();
