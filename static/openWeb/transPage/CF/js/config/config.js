
/**
 * 配置项 window.webConfig
 * apiUrl 接口地址 
 */

(function (global, factory) {
  global.webConfig = factory()
})(this, (function () {
  var gloabConfig = {
    apiUrl: 'https://jurongtest.foxconn.com/JuXin/openapi'
  }
  return gloabConfig
}))