/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 * apiUrl: 接口地址
 *
 */
var baseUrl = ''
var apiUrl = baseUrl + '/openapi'
var codeUrl = baseUrl + '/code'
var protocol = document.location.protocol
var host = document.location.host
var distUrl = ''
// let basePath = document.location.hostname === 'localhost' ? '/JuXin' : getContextPath()
var basePath = '/JuXin'
apiUrl = basePath + '/openapi'
distUrl = protocol + '//' + host + '/JuXin-Web'
window.g = {
  baseUrl: baseUrl,
  apiUrl: apiUrl,
  codeUrl: codeUrl,
  distUrl: distUrl
}
