/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 *
 */
let baseUrl = ''
let iconfontVersion = ['567566_lgiis24af44bcsor']
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`
let codeUrl = `${baseUrl}/code`
let protocol = document.location.protocol
let host = document.location.host
let basePath = getContextPath()
if (process.env.NODE_ENV === 'development') {
  baseUrl = `https://jurongtest.foxconn.com/sit/`
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = `${protocol}//${host}${basePath}`
}
export { baseUrl, iconfontUrl, iconfontVersion, codeUrl }
function getContextPath () {
  var pathName = document.location.pathname
  var index = pathName.substr(1).indexOf('/')
  var result = pathName.substr(0, index + 1)
  return result
}
