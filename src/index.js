// @require fis-mod
require("bootstrap/dist/css/bootstrap.css");
require("css/index.less");

window.jQuery = window.$ = require("jquery");
require("bootstrap");
require("./lib/jquery-ui/js/jquery-ui-datepicker.js");
window.io = require("./lib/socket.io-1.4.5.js");

window.React = require("react");
window.ReactDOM = require("react-dom");

window.ReactBootstrap = require("./lib/react-bootstrap.js");
window.ReactRouter = require("./lib/ReactRouter.min.js");

require("./comp/App.jsx");