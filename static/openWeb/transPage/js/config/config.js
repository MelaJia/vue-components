
/**
 * 配置项 window.webConfig
 * apiUrl 接口地址 
 */
(function (global, factory) {
  global.webConfig = factory()
})(this, (function () {
  var gloabConfig = {
    apiUrl: 'http://10.130.2.220:3000'
  }
  return gloabConfig
}))