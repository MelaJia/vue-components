/* eslint-disable */
var DEFAULT_URL = "";//注意，删除的变量在这里重新定义
$(document).ready(function(){
var PDFData = "";
var param = GetRequest();
DEFAULT_URL = param.url;
var t=param.url.split('/')
window.document.title=t[t.length-1]
});
function GetRequest() {   
  var url = location.search; //获取url中"?"符后的字串   
  var theRequest = new Object();   
  if (url.indexOf("?") != -1) {   
     var str = url.substr(1);   
     strs = str.split("&");   
     for(var i = 0; i < strs.length; i ++) {   
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
     }   
  }   
  return theRequest;   
}
function getApiUrl() {
  var baseUrl = ''
  var basePath = getContextPath()
  baseUrl = document.location.protocol+'//'+document.location.host+basePath
  apiUrl = baseUrl+'/openapi'
  return apiUrl
}
function getContextPath () {
  var pathName = document.location.pathname
  var index = pathName.substr(1).indexOf('/')
  var result = pathName.substr(0, index + 1)
  return result
}