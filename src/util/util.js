import {
  validatenull
} from './validate'
import {
  baseUrl
} from '@/config/env'
import CryptoJS from 'crypto-js'
import { loadingConf } from '@/config/common' // 获取加载配置
/**
 * 加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params
  let result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else if (type === 'Aes') {
    param.forEach(ele => {
      result[ele] = CryptoJS.AES.encrypt(result[ele], key).toString()
    })
  }
  return result
}

/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? `${title}——Avue 通用管理 系统快速开发框架` : 'Avue 通用管理 系统快速开发框架'
  window.document.title = title
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen () {
    callback()
  }
  document.addEventListener('fullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('msfullscreenchange', function (e) {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('http') !== -1 || url.indexOf('https') !== -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}
/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = ''
  if ($route.query.src) {
    value = $route.query.src
    if (value.indexOf(baseUrl) !== -1) {
      const port = value
        .substr(value.lastIndexOf(':'))
        .replace(value.substr(value.lastIndexOf('/')), '')
      const path = value.replace(baseUrl + port, '')
      value = '#' + path + port
    }
  } else {
    value = $route.path
  }
  return value
}
/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof (value) === 'string' || typeof (value) === 'number') {
    let index = 0
    index = findArray(dic, value)
    if (index !== -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach(ele => {
      index = findArray(dic, ele)
      if (index !== -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i
    }
  }
  return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len = 4, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len)
  if (date) random = random + Date.now()
  return random
}

/**
 * Date扩展时间格式化初始化
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
export const dateInit = () => {
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份         
      "d+": this.getDate(), //日         
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
      "H+": this.getHours(), //小时         
      "m+": this.getMinutes(), //分         
      "s+": this.getSeconds(), //秒         
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
      "S": this.getMilliseconds() //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
}
/**
 * 首字母大写
 * @param {*} str 字符串
 */
export const firstToUpperCase = (str)=>{ // 正则法
  // str = str.toLowerCase();
  var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
  return str.replace(reg,function(m){ 
   return m.toUpperCase()
  });
 }
 /**
  * 打印
  * @param {*} dom 
  * @param {*} options 
  */
 export const Print =function(dom, options) {
  if (!(this instanceof Print)) return new Print(dom, options);

  this.options = this.extend({
    'noPrint': '.no-print'
  }, options);

  if ((typeof dom) === "string") {
    this.dom = document.querySelector(dom);
  } else {
    this.dom = dom;
  }

  this.init();
};
// 打印类属性、方法定义
Print.prototype = {
  init: function() {
    var content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  },
  extend: function(obj, obj2) {
    for (var k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  },

  getStyle: function() {
    var str = "",
      styles = document.querySelectorAll('style,link');
    for (var i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    str += "<style>" + (this.options.noPrint ? this.options.noPrint : '.no-print') + "{display:none;}</style>";

    return str;
  },

  getHtml: function() {
    var inputs = document.querySelectorAll('input');
    var textareas = document.querySelectorAll('textarea');
    var selects = document.querySelectorAll('select');

    for (var k in inputs) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute('checked', "checked")
        } else {
          inputs[k].removeAttribute('checked')
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute('value', inputs[k].value)
      }
    }

    for (var k2 in textareas) {
      if (textareas[k2].type == 'textarea') {
        textareas[k2].innerHTML = textareas[k2].value
      }
    }

    for (var k3 in selects) {
      if (selects[k3].type == 'select-one') {
        var child = selects[k3].children;
        for (var i in child) {
          if (child[i].tagName == 'OPTION') {
            if (child[i].selected == true) {
              child[i].setAttribute('selected', "selected")
            } else {
              child[i].removeAttribute('selected')
            }
          }
        }
      }
    }

    return this.dom.outerHTML;
  },

  writeIframe: function(content) {
    var w, doc, iframe = document.createElement('iframe'),
      f = document.body.appendChild(iframe);
    iframe.id = "myIframe";
    iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";

    w = f.contentWindow || f.contentDocument;
    doc = f.contentDocument || f.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
    this.toPrint(w);

    setTimeout(function() {
      document.body.removeChild(iframe)
    }, 100)
  },

  toPrint: function(frameWindow) {
    try {
      setTimeout(function() {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand('print', false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.log('err', err);
    }
  }
};
/**
 * 防抖
 * @param {*} fun 
 * @param {*} delay 
 * @param {*} immediate 
 */
export const debounce = function (fun, delay, immediate) {
  var timer, lasttime, context, arg
  var later = function () {
    var now = new Date().getTime(),
      l = now - lasttime
    if (l < delay && l >= 0) {
      clearTimeout(timer)
      timer = setTimeout(later, delay - l)
    } else {
      clearTimeout(timer)
      timer = null
      if (!immediate) {
        fun.apply(context, arg)
        if (!timer) context = arg = null
      }
    }
  }
  return function () {
    context = this
    arg = arguments
    lasttime = new Date().getTime()
    var callNow = immediate && !timer
    if (!timer) timer=setTimeout(later, delay)
    if (callNow) {
      fun.apply(context, arg)
      context = arg = null
    }
  }
}

/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
**/
export const throttle = function (fn,threshhold) {
  // 记录上次执行的时间
  var last

  // 定时器
  var timer

  // 默认间隔为 250ms
  threshhold || (threshhold = 250)

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    var now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
/**
 * 
 * @param {obj} err 错误对象
 * @param {obj} loading 加载图标对象
 */
export const erroShow = function (err, loading) {
  // 关闭加载图标
  if(loading) {
    loading.close()
  }
  debugger
  if(err.response && err.response.status === 401){
  }else{
    console.log('系统异常',err)
    this.$alert(`系统异常,请联系管理员!`, '系统提示', {
      confirmButtonText: '确定',
      callback: action => {
      }
    })
  }
    
}
/**
 * 获取数据基础函数
 * @returns {obj} axios返回的对象res.data.data
 * @param {str} url 请求地址
 * @param {obj} param 请求参数
 * @param {boolean} showLoading 是否显示加载图标
 */
export const getDataBase = function (url, param, showLoading) {
  if(typeof param=='boolean'){
    showLoading = param
    param = null
  }
  // 显示加载图标
  const loading = showLoading ? this.$loading(loadingConf.get()) : null
  return this.axios.post(url, param).then((res) => {
    // 关闭加载图标
    if(loading){
      loading.close()
    }
    if (res.data.status) {
      return res.data.data
    } else {
      this.$message({
        showClose: true,
        message: res.data.msg,
        type: 'error'
      })
      return false
    }
  }).catch((err) => {
    // 错误提示
    // 显示加载框则弹窗提示框
    if(showLoading){
      erroShow.call(this, err, loading)
    }else{
      //否则报错输出
      throw new Error(err)
    }
  })
}
/**
 * 提交数据基础函数
 * @returns {obj} axios返回的对象
 * @param {str} url 请求地址
 * @param {obj} param 请求参数
 * @param {boolean} showLoading 是否显示加载图标
 * @example postDataBase.call(this, url, param, true).then(res=>{console.log(res)})
 */
export const postDataBase = function (url, param, showLoading) {
  if(typeof param=='boolean'){
    showLoading = param
    param = null
  }
  // 1.显示加载图标
  const loading = showLoading ? this.$loading(loadingConf.sub()) : null
   // 2.发送请求
  return this.axios.post(url, param).then((res) => {
    // 关闭加载图标
    if(loading){
      loading.close()
    }
    let type = res.data.status ? 'success' : 'error'
    if(typeof res.data.data === 'string'){
      this.$message({
        showClose: true,
        message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
        type: type
      })
    }
    return res
  }).catch((err) => {
    // 显示加载框则弹窗提示框
    if(showLoading){
      erroShow.call(this, err, loading)
    }else{
      //否则报错输出
      throw new Error(err)
    }
  })
}
/**
 * 千分位转换
 * @param {number} val 转换值
 */
export const thousandth = function (val) {
  var regex = /(\d)(?=(\d{3})+$)/g
  var result
  if (typeof val === 'string') {
    let str = val
    if (str.indexOf('.') === -1) {
      result = str.replace(regex, '$1,') + '.00'
    } else {
      var newStr = str.split('.')
      var str2 = newStr[0].replace(regex, '$1,')
      if (newStr[1].length <= 1) {
        // 小数点后只有一位时
        result = str2 + '.' + newStr[1] + '0'
      } else if (newStr[1].length > 1) {
        // 小数点后两位以上时
        var decimals = newStr[1].substr(0, 2)
        result = str2 + '.' + decimals
      }
    }
  } else if (typeof val === 'number') {
    return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }else if(val === undefined||val ===null){
    return '0.00'
  }
  return result
}
