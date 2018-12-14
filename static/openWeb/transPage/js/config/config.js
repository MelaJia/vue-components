
/**
 * 配置项 window.webConfig
 * apiUrl 接口地址 
 */
(function (global, factory) {
  global.webConfig = factory()
})(this, (function () {
  let protocol = document.location.protocol
  let host = document.location.host
  var gloabConfig = {
    apiUrl: protocol + '//' + host + '/JuXin/openapi',
    distUrl: protocol + '//' + host
  }
  return gloabConfig
}))