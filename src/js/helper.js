(function() {
  // guid
  Math.guid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  };

  // Function.prototype.bind
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(obj) {
      var slice = [].slice,
        args = slice.call(arguments, 1),
        self = this,
        nop = function() {},
        bound = function() {
          return self.apply(this instanceof nop ? this : (obj || {}),
            args.concat(slice.call(arguments)));
        };

      nop.prototype = self.prototype;

      bound.prototype = new nop();

      return bound;
    };
  }

  // Helper tool
  var Helper = {
    time2str: function(timevalue, minUnit) {
      var d, dat, fnZero, hr, min, month, year, sec;
      var minUnit = minUnit || "min";
      if (!timevalue) {
        return timevalue;
      }
      fnZero = function(val) {
        if (10 > val) {
          return "0" + val;
        } else {
          return "" + val;
        }
      };
      d = new Date(timevalue);
      year = d.getFullYear();
      month = fnZero(d.getMonth() + 1);
      dat = fnZero(d.getDate());
      hr = fnZero(d.getHours());
      min = fnZero(d.getMinutes());
      sec = fnZero(d.getSeconds());
      switch(minUnit){
        case "sec":
          return [year, "-", month, "-", dat, " ", hr, ":", min, ":", sec].join("");
        default:
          return [year, "-", month, "-", dat, " ", hr, ":", min].join("");
      }
    }
  };

  // exports
  module.exports = Helper;
})();