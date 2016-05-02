#react-admin-demo

temp: module template

```jsx
(function(){
  var AppConfig = require("AppConfig", "window");
  var AppProvider = require("AppProvider", "window");


  // exports
  exports("Admin", Admin);
})();
```

A admin system based on React.

Only Supports Modern browsers.

##开发环境说明

本项目使用fis3前端构建工具，但已通过封装为**FIZ**插件，故请按照以下步骤进行环境安装。

先安装[nodejs](https://nodejs.org/),利用nodejs的插件来进行开发：

1、安装插件：`npm i -g fiz`

2、启动fiz服务器： `fiz server start`, 将自动打开127.0.0.1:8080端口进行调试和预览

3、编译项目并监听变化：

  * 本地调试：`fiz release -w`
  * 远程环境调试：`fiz release pu -w`
  * 相对路径打包：`fiz release lc`
  * 测试环境打包：`fiz release qa`
  * 正式环境打包：`fiz release pr`

##打相对路径包说明

**如果需要以相对路径来打包，则需要做到以下这些：**

fis-conf.js默认已配置了本地打包的设置，但有一点可能还需开发者自己定义，即模板HTML文件发布后相对服务器的路径，因为模板HTML文件放置的路径一般为资源的路径，如`tpls/template.html`文件之类，但它们渲染在视图中路径就会变为`/index.html`，所以要设置好相对`/index.html`而不是`tpls/template.html`的路径即可。

以下为fis-conf.js中关于这部分的代码：

```javascript
  // 模板发布到服务器后以相对服务器的路径进行配置
  .match("src/*/**.jade", {
    relative: "/src"
  });
```
