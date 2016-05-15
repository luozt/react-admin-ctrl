(function(){

  var Datepicker = React.createClass({
    propTypes: {
      id: React.PropTypes.string,
      another: React.PropTypes.string,
      pickerType: React.PropTypes.string
    },

    componentDidMount: function() {
      $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

      var anotherPicker = $("#"+this.props.another),
        restrictStr;

      if("start" === this.props.pickerType){
        restrictStr = "minDate";
      }else if("end" === this.props.pickerType){
        restrictStr = "maxDate";
      }else{
        restrictStr = null;
      }

      $(this.refs.input).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function(selectedDate){
          if(restrictStr){
            anotherPicker.datepicker("option", restrictStr, selectedDate);
          }
        }
      });
    },
    reset: function(){
      this.refs.input.value = "";
    },
    getValue: function(){
      return this.refs.input.value;
    },
    render: function(){
      return (
        <input {...this.props} ref="input" type="text" />
      );
    }
  });

  // exports("Datepicker", Datepicker);
  module.exports = Datepicker;

})();
