import 'es5-shim'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/element-#5795E2/index.css'
import '~static/cnd/font_1/iconfont.css'
import '@/assets/css/tags.scss'
import 'animate.css'
import '@/assets/css/animate.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as types from '@/store/types'
import dateInit from '@/plugs/date'
import {
  apiUrl
} from '@/config/env.js'
import {
  monitorInit
} from '@/monitorDatas'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)// 图片预览
Vue.use(dateInit) // 格式化日期注册
axios.defaults.baseURL = apiUrl
if (process.env.NODE_ENV === 'development') {
  monitorInit() // 模拟数据初始化
}
// 设置请求拦截器
if (process.env.NODE_ENV === 'production') {
  axios.interceptors.request.use(
    config => {
      console.log(store.getters.token)
      if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.getters.token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })
}

// 设置返回拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    if (error.response) {
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  })
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
