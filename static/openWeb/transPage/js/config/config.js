
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
    apiUrl: protocol + '//' + host + 'http://10.130.2.220:3000'
  }
  return gloabConfig
}))