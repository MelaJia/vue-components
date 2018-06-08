/* eslint-disable */
var DEFAULT_URL = "";//注意，删除的变量在这里重新定义
$(document).ready(function(){
var PDFData = "";
var param = GetRequest();
var url = getApiUrl()
$.ajax({
    type:"post",
    async:false,
    mimeType: 'text/plain; charset=x-user-defined',
    url:url+'/contract/showContract?contractNo='+param.contractNo,
    success:function(data){
       PDFData = data;
    }
});
var rawLength = PDFData.length;
//转换成pdf.js能直接解析的Uint8Array类型,见pdf.js-4068
var array = new Uint8Array(new ArrayBuffer(rawLength));  
for(i = 0; i < rawLength; i++) {
  array[i] = PDFData.charCodeAt(i) & 0xff;
}
DEFAULT_URL = array;
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